import { Router } from "express";

import BotController from "./app/controllers/BotController";
import LoginController from "./app/controllers/LoginController";
import UserController from "./app/controllers/UserController";

const routes = new Router();

//=========Rotas============
//bots

routes.get("/bots", (req, res) => {
    return res.json(req.body);
});

routes.get("/bots/:id", (req, res) => {
    return res.send(req.params.id);
});

routes.post("/bots", BotController.store);

routes.put("/bots", (req, res) => {
    //return res.response("to aqui");
});

routes.delete("/bots/:id", BotController.delete);

//administrativo
routes.post("/login",LoginController.store);

export default routes;