import { container } from "tsyringe";

import { IDocsRepository } from "../../modules/docs/repositories/IDocsRepository";
import { DocsRepository } from "../../modules/docs/repositories/implementations/DocsRepository";

container.registerSingleton<IDocsRepository>("DocsRepository", DocsRepository);
