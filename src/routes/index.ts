import { Router } from "express";

import { docsRoutes } from "./docs.routes";

const router = Router();

router.use("/boleto", docsRoutes);

export { router };
