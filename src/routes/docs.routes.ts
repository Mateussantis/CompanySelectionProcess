import { Router } from "express";

import { ConsultLiController } from "../modules/docs/useCases/ConsultLi/ConsultLiController";

const docsRoutes = Router();

const consultLiController = new ConsultLiController();

docsRoutes.get("/:ld", consultLiController.handle);

export { docsRoutes };
