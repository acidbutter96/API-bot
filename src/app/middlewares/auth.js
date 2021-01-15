import jwt from "jsonwebtoken";
import {promisify} from "util";
import configAuth from "../../config/auth";

export default async (req,res,next)=>{
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if(!authHeader) return res.status(401).json({
        error: true,
        code: 130,
        message: "Erro: token não encontrado"
    });

    try{
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        
        req.botID = decoded.id;

        return next();
    }catch(err){
        return res.status(401).json({
            error: true,
            code: 131,
            message: "Erro: token inválido"
        });
    }
}