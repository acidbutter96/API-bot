//classe para instanciar rotas
import { Router } from "express";

//Controlador
import BotController from "./app/controllers/BotController";
import LoginController from "./app/controllers/LoginController";
import UserController from "./app/controllers/UserController";
import MessageController from "./app/controllers/MessageController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Rotas, esses são os endpoints da aplicação

// ====================  bots  ====================

routes.get("/bots", authMiddleware, BotController.index);
routes.get("/bots/:id", authMiddleware, BotController.show);
routes.post("/bots", authMiddleware, BotController.store);
routes.put("/bots", authMiddleware, BotController.update);
routes.delete("/bots/:id", authMiddleware, BotController.delete);

// ====================  messages  ====================

routes.post("/messages",MessageController.sendMessage);
routes.get("/messages/:id",MessageController.showMessage);
routes.get("/messages",MessageController.showConversation)

// ====================  AdmPanel  ====================
routes.post("/login", LoginController.store);

export default routes;