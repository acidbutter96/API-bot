import express from "express";
import routes from "./routes"
import "./config/conexao";

class App{
    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use(routes);
    }
}

export default new App().app;