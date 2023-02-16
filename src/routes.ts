import { Router } from "express";
import {
  contatoAllController,
  contatoByClienteController,
  contatoByIdController,
  contatoCreateController,
  contatoDeleteController,
  contatoUpdateController,
} from "./controllers/contato.controlle";
import {
  crianteAllController,
  crianteCreateController,
  criateByIdController,
  criateDeleteController,
  criateUpdateController,
} from "./controllers/critente.controller";
import { loginController } from "./controllers/login.controller";
import {
  deleteUserController,
  userAllController,
  userCreateController,
  userOneController,
  userUpdateController,
} from "./controllers/user.controller";
import autentificarToken from "./Middlewares/autenticacao.middleware";
import {
  contatoCreateSchema,
  validateContatoCreate,
} from "./validator/contatoValidate.middleware";
import {
  crianteCreateSchema,
  validateCrianteCreate,
} from "./validator/criateValidate.middleware";
import {
  userCreateSchema,
  validateUserCreate,
} from "./validator/userValidate.middleware";

const routes = Router();
//User rotas
routes.post(
  "/user",
  validateUserCreate(userCreateSchema),
  userCreateController
);
routes.get("/user/all", autentificarToken, userAllController);
routes.get("/user", autentificarToken, userOneController);
routes.patch("/user/update", autentificarToken, userUpdateController);
routes.delete("/user", autentificarToken, deleteUserController);

//login
routes.post("/login", loginController);

//Criantes rotas
routes.post(
  "/client",
  autentificarToken,
  validateCrianteCreate(crianteCreateSchema),
  crianteCreateController
);
routes.get("/client/all", autentificarToken, crianteAllController);
routes.get("/client/:id", autentificarToken, criateByIdController);
routes.patch("/client/:id", autentificarToken, criateUpdateController);
routes.delete("/client/:id", autentificarToken, criateDeleteController);

//Contato rotas
routes.post(
  "/contato/:id",
  validateContatoCreate(contatoCreateSchema),
  autentificarToken,
  contatoCreateController
);
routes.get("/contato/all", autentificarToken, contatoAllController);
routes.get("/contato/:id", autentificarToken, contatoByIdController);
routes.get(
  "/contato/cliente/:id",
  autentificarToken,
  contatoByClienteController
);
routes.patch("/contato/:id", autentificarToken, contatoUpdateController);
routes.delete("/contato/:id", autentificarToken, contatoDeleteController);

export default routes;
