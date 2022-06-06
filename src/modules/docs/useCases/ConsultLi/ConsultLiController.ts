import { Request, Response } from "express";
import { container } from "tsyringe";

import { ConsultLiUseCase } from "./ConsultLiUseCase";

class ConsultLiController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { ld } = req.params;

        const consultLiUseCase = container.resolve(ConsultLiUseCase);

        const codeBarForWhile = await consultLiUseCase.execute(ld);

        return res.status(200).json(codeBarForWhile);
    }
}

export { ConsultLiController };
