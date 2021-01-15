import { Router } from "express";

import BotController from "./app/controllers/BotController";
import LoginController from "./app/controllers/LoginController";
import UserController from "./app/controllers/UserController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

//=========Rotas============
//bots

routes.get("/bots", BotController.index);
routes.get("/bots/:id", BotController.show);
routes.post("/bots", BotController.store);
routes.put("/bots", BotController.update);
routes.delete("/bots/:id", authMiddleware, BotController.delete);

//administrativo
routes.post("/login",LoginController.store);

export default routes;