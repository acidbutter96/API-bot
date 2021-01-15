import * as Yup from "yup";
import Bot from "../models/Bot";


class BotController{
    async store(req,res){

        const schema = Yup.object().shape({
            id: Yup.string()
                .required(),
            name: Yup.string()
                .required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos"
            });
        }

        const idExists = await Bot.findOne({id: req.body.id});
        if(idExists){
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: bot já cadastrado"
            });
        }
        const bot = await Bot.create(req.body, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: bot não cadastrado com sucesso"
            });

            return res.status(200).json({
                error: false,
                message: "Bot cadastrado com sucesso"
            });
        });
    }
}

export default new BotController();
