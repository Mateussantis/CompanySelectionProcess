import Integer from "integer";

import { IDocsRepository } from "../IDocsRepository";

class DocsRepository implements IDocsRepository {
    consult(li: string): Promise<string> {
        if (!li) {
            throw new Error("Method not implemented.");
        }
        return null;
    }

    convertLiToCodeBar(li: string): string {
        console.log("Linha Digitavel", li);

        // console.log("2", li.replaceAll("[^0-9]", ""));
        // const linha: string = li.replaceAll("[^0-9]", "");

        const linha: string = li;

        if (linha.length !== 44) {
            return null;
        }

        const campo1 = `${
            linha.substring(0, 4) + linha.substring(19, 20)
        }.${linha.substring(20, 24)}`;
        const campo2 = `${linha.substring(24, 29)}.${linha.substring(29, 34)}`;
        const campo3 = `${linha.substring(34, 39)}.${linha.substring(39, 44)}`;
        const campo4: string = linha.substring(4, 5); // Digito verificador
        const campo5: string = linha.substring(5, 19); // Vencimento + Valor

        console.log("Campos: ", campo1, campo2, campo3, campo4, campo5);

        if (
            this.module11Bank(
                linha.substring(0, 4) + linha.substring(5, 44)
            ) !== Integer.valueOf(campo4)
        ) {
            return null; // 'Digito verificador '+campo4+', o correto é '+modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  )+'\nO sistema não altera automaticamente o dígito correto na quinta casa!'
        }

        const teste = `${
            campo1 + this.module10(campo1)
        } ${campo2}${this.module10(campo2)} ${campo3}${this.module10(
            campo3
        )} ${campo4} ${campo5}`;

        console.log("Teste: ", teste);

        return `${campo1 + this.module10(campo1)} ${campo2}${this.module10(
            campo2
        )} ${campo3}${this.module10(campo3)} ${campo4} ${campo5}`;
    }

    module10(number: string): number {
        console.log("Module 10");
        // eslint-disable-next-line no-param-reassign
        number = number.replaceAll("[^0-9]", "");

        let soma = 0;
        let peso = 2;
        let contador: number = number.length - 1;

        while (contador >= 0) {
            let multiplicacao: number =
                Integer.valueOf(number.substring(contador, contador + 1)) *
                peso;
            if (multiplicacao >= 10) {
                multiplicacao = 1 + (multiplicacao - 10);
            }
            soma += multiplicacao;
            if (peso === 2) {
                peso = 1;
            } else {
                peso = 2;
            }
            contador -= 1;
        }

        let digito: number = 10 - (soma % 10);

        if (digito === 10) digito = 0;

        console.log("Module 10: ", digito);

        return digito;
    }

    module11Bank(number: string): number {
        console.log("Module 11");

        // eslint-disable-next-line no-param-reassign
        // number = number.replaceAll("[^0-9]", "");

        let soma = 0;
        let peso = 2;
        const base = 9;
        const contador: number = number.length - 1;

        // eslint-disable-next-line no-plusplus
        for (let i = contador; i >= 0; i--) {
            soma += Integer.valueOf(number.substring(i, i + 1)) * peso;
            if (peso < base) {
                // eslint-disable-next-line no-plusplus
                peso++;
            } else {
                peso = 2;
            }
        }

        let digito: number = 11 - (soma % 11);
        if (digito > 9) digito = 0;
        /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
        if (digito === 0) digito = 1;

        console.log("Module 11: ", digito);

        return digito;
    }
}

export { DocsRepository };
