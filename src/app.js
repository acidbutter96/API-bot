//importar dependências

import sessionId from 'express-session-id';
import express from "express";
import routes from "./routes";
import cors from "cors";
import "./config/conexao";
import cookieParser from 'cookie-parser';

//criar classe para instanciar objetos, esse é o coração da API

class App{
    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }

    //validações, comunicações e configurações entre as requisições e respostas
    middleware(){
        //Habilitar requisições com json
        this.app.use(express.json());
        
        //Configurar CORS
        this.app.use((res,req,next)=>{
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers","X-PINGOTHER, Content-Type")
            this.app.use(cors());
            next();
        });

        //Analisar cookies
        this.app.use(cookieParser("oi"))
        this.app.use(sessionId({
            idleTime: 5000, // 10 minutes
            name:"sessionID",
            cookie: {
              signed: true
            }
          }));
    }

    routes(){
        //habilitar as rotas criadas em routes
        this.app.use(routes);
    }
}

export default new App().app;