import moment from "moment";

import { IDocsRepository } from "../IDocsRepository";

class DocsRepository implements IDocsRepository {
    convertLdToCodeBar(ld: string): string {
        if (ld.match(/^[0-9]+$/) === null) {
            return "1";
        }
        if (ld.length !== 47) {
            return "0";
        }

        const campo1 = `${ld.substring(0, 4) + ld.substring(32, 47)}`;
        const campo2 = `${ld.substring(4, 9) + ld.substring(10, 16)}`;
        const campo3 = `${ld.substring(16, 20) + ld.substring(21, 31)}`;

        return `${campo1 + campo2 + campo3}`;
    }

    convertLdToAmount(ld: string): string {
        const campoAmount = ld.substring(37, 47);
        let index: number;

        if (campoAmount === "0000000000") {
            return "0";
        }

        const amoutArray = campoAmount.split("0");

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < amoutArray.length; i++) {
            if (amoutArray[i] !== "0" && amoutArray[i] !== "") {
                index = i;
            }
        }

        const fullAmountToParse = campoAmount.substring(
            index - 1,
            campoAmount.length
        );

        const amountToParse = fullAmountToParse.substring(0, Number(index));
        const startIndexToParse = Number(amountToParse.indexOf("0"));

        const amountToFixed = `${
            fullAmountToParse.substring(0, startIndexToParse) +
            fullAmountToParse.substring(
                startIndexToParse,
                fullAmountToParse.length - 2
            )
        }`;

        const finalAmount = parseFloat(amountToFixed).toFixed(2);

        return finalAmount.toString();
    }

    convertLdToDate(ld: string): string {
        const today = moment().format("DD/MM/YYYY");
        const campoDate = ld.substring(33, 37);
        const campoDateTratado = Number(campoDate) - 1000;
        const baseDate = moment("03/07/2000", "DD/MM/YYYY");
        const baseDate2 = moment("22/02/2025", "DD/MM/YYYY");
        const verify =
            moment(today, "DD/MM/YYYY").isAfter(baseDate2) ||
            moment(today, "DD/MM/YYYY").isSame(baseDate2);
        let days: string;

        if (campoDate === "0000") {
            return "0";
        }

        if (!verify) {
            days = moment(baseDate, "DD/MM/YYYY")
                .add(campoDateTratado, "days")
                .format("DD/MM/YYYY");
        }

        if (verify) {
            days = moment(baseDate2, "DD/MM/YYYY")
                .add(campoDateTratado, "days")
                .format("DD/MM/YYYY");
        }

        return days.toString();
    }

    verifyDv(ld: string): boolean {
        const campo1 = ld.substring(0, 9);
        const campo2 = ld.substring(10, 20);
        const campo3 = ld.substring(21, 31);

        let count = 0;
        let mult = 0;

        let count2 = 0;
        let mult2 = 0;

        let count3 = 0;
        let mult3 = 0;

        const resultOfMultiplication1 = [];
        const resultOfMultiplication2 = [];
        const resultOfMultiplication3 = [];

        // eslint-disable-next-line no-plusplus
        for (count; count < campo1.length; count++) {
            if (count % 2 === 0) {
                mult = Number(campo1[count]) * 2;
                resultOfMultiplication1.push(mult);
            } else {
                mult = Number(campo1[count]) * 1;
                resultOfMultiplication1.push(mult);
            }
        }

        // eslint-disable-next-line no-plusplus
        for (count2; count2 < campo2.length; count2++) {
            if (count2 % 2 !== 0) {
                mult2 = Number(campo2[count2]) * 2;
                resultOfMultiplication2.push(mult2);
            } else {
                mult2 = Number(campo2[count2]) * 1;
                resultOfMultiplication2.push(mult2);
            }
        }

        // eslint-disable-next-line no-plusplus
        for (count3; count3 < campo3.length; count3++) {
            if (count3 % 2 !== 0) {
                mult3 = Number(campo3[count3]) * 2;
                resultOfMultiplication3.push(mult3);
            } else {
                mult3 = Number(campo3[count3]) * 1;
                resultOfMultiplication3.push(mult3);
            }
        }

        let afterString1: string;
        let afterNumber1: number;

        let afterString2: string;
        let afterNumber2: number;

        let afterString3: string;
        let afterNumber3: number;

        const sum1 = resultOfMultiplication1.reduce((before, after) => {
            if (after > 9) {
                afterString1 = after.toString();
                afterNumber1 =
                    Number(afterString1[0]) + Number(afterString1[1]);
                return afterNumber1 + before;
            }
            return before + after;
        }, 0);

        const sum2 = resultOfMultiplication2.reduce((before, after) => {
            if (after > 9) {
                afterString2 = after.toString();
                afterNumber2 =
                    Number(afterString2[0]) + Number(afterString2[1]);
                return afterNumber2 + before;
            }
            return before + after;
        }, 0);

        const sum3 = resultOfMultiplication3.reduce((before, after) => {
            if (after > 9) {
                afterString3 = after.toString();
                afterNumber3 =
                    Number(afterString3[0]) + Number(afterString3[1]);
                return afterNumber3 + before;
            }
            return before + after;
        }, 0);

        const restOfDivision1 = sum1 % 10;
        const restOfDivision2 = sum2 % 10;
        const restOfDivision3 = sum3 % 10;

        const majorTen1 = Math.ceil(sum1 / 10) * 10;
        const majorTen2 = Math.ceil(sum2 / 10) * 10;
        const majorTen3 = Math.ceil(sum3 / 10) * 10;

        const dv1ToParse = majorTen1 - restOfDivision1;
        const dv2ToParse = majorTen2 - restOfDivision2;
        const dv3ToParse = majorTen3 - restOfDivision3;

        const dv1String = dv1ToParse.toString();
        const dv2String = dv2ToParse.toString();
        const dv3String = dv3ToParse.toString();

        const dv1 = Number(dv1String[1]);
        const dv2 = Number(dv2String[1]);
        const dv3 = Number(dv3String[1]);

        const dv1Ld = Number(ld[9]);
        const dv2Ld = Number(ld[20]);
        const dv3Ld = Number(ld[31]);

        if (dv1Ld === dv1 && dv2Ld === dv2 && dv3Ld === dv3) return true;

        return false;
    }
}

export { DocsRepository };
