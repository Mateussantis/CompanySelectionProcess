import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IDocsRepository } from "../../repositories/IDocsRepository";

@injectable()
class ConsultLiUseCase {
    constructor(
        @inject("DocsRepository")
        private docsRepository: IDocsRepository
    ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    async execute(ld: string): Promise<Object> {
        const getBarCode = this.docsRepository.convertLdToCodeBar(ld);
        const getAmount = this.docsRepository.convertLdToAmount(ld);
        const getDate = this.docsRepository.convertLdToDate(ld);
        const getVerified = this.docsRepository.verifyDv(ld);

        if (getBarCode === "1") {
            throw new AppError(
                "A Linha Digitavel não deve possuir caracteres, apenas numeros !"
            );
        }

        if (getBarCode === "0") {
            throw new AppError("A Linha Digitavel deve possuir 47 digitos !");
        }

        if (getAmount === "0" && getDate === "0") {
            throw new AppError("A Linha Digitavel não possui valor ou data !");
        }

        if (!getBarCode || !getVerified) {
            throw new AppError("Linha Digitavel incorreta !");
        }

        const obj = {
            barCode: getBarCode,
            amount: getAmount,
            expirationDate: getDate,
        };

        return obj;
    }
}

export { ConsultLiUseCase };
