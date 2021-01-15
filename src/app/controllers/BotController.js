import * as Yup from "yup";
import Bot from "../models/Bot";


class BotController{
    async store(req,res){

        const schema = Yup.object().shape({
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

        const nameExists = await Bot.findOne({name: req.body.name});
        if(nameExists){
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

    async delete(req,res){
        const botExists = await Bot.findOne({_id:req.params.id});

        if(!botExists){
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Bot não encontrado"
            });
        }

        const bot = await Bot.deleteOne({_id: req.params.id}, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                code: 122,
                message: "Erro ao processar a solicitação"
            })
        });

        return res.json({
            error: false,
            message: "Bot removido"
        });
    }
}

export default new BotController();
