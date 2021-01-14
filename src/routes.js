import { Router } from "express";

import Bot from "./app/models/Bot";

const routes = new Router();

//=========Rotas============
//bots

//validarRequisições
function valGet(req, res, next) {
    if (!req.body.id) {
        return res.status(400).json({
            error: "ID não informado",
            esperado: '{\n  "id":"16edd3b3-3f75-40df-af07-2a3813a79ce9",\n  "name":"bot"\n}'
        });
    }
    return next();
}

function valPost(req, res, next) {
    if (!req.body) return res.status(400).json({
        error: "Empty body"
    });
}

routes.get("/bots", valGet, (req, res) => {
    return res.json(req.body);
});

routes.get("/bots/:id", (req, res) => {
    return res.send(req.params.id);
});

routes.post("/bots", async (req, res) => {
    console.log("to aqui");
    await Bot.create(req.body);
    return res.json({
        "status":"success"
    });
    //return res.response("to aqui");
}, function (err, small) {
    if (err) return res.status(400).json({ error: "Erro: Bot não foi cadastrado com sucesso " + err });

    return res.status(200).json({
        error: "Bot cadastrado com sucesso"
    });
});

routes.put("/bots", (req, res) => {
    //return res.response("to aqui");
});

routes.delete("/bots", (req, res) => {
    //return res.response("to aqui");
});

export default routes;