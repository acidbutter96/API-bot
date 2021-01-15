import { Router } from "express";

import BotController from "./app/controllers/BotController";
import LoginController from "./app/controllers/LoginController";
import UserController from "./app/controllers/UserController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

//=========Rotas============
//bots

routes.get("/bots", authMiddleware, BotController.index);
routes.get("/bots/:id", authMiddleware, BotController.show);
routes.post("/bots", authMiddleware, BotController.store);
routes.put("/bots", authMiddleware, BotController.update);
routes.delete("/bots/:id", authMiddleware, BotController.delete);

//administrativo
routes.post("/login", LoginController.store);

export default routes;