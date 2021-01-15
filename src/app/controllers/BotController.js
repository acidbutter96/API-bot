import * as Yup from "yup";
import Bot from "../models/Bot";
import User from "../models/User";


class BotController {

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 30 } = req.query;
        await Bot.paginate({

        }, {
            select: "id name -_id",
            page,
            limit
        }).then((bots) => {
            return res.json({
                error: false,
                bots: bots
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Não foi possível processar a solicitação " + err
            })
        })
    }

    async show(req, res) {
        Bot.findOne({ id: req.params.id }, "id name -_id").then((bot) => {

            return res.json({
                error: false,
                bot: bot
            })
        }).catch((err) => {

            return res.status(400).json({
                error: true,
                code: 107,
                message: "Não foi possível executar a solicitação. Returned: " + err
            })
        });

    }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            id: Yup.string()
                .required()
                .min(36)
                .max(36)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Error: Dados inválidos"
            });
        }

        const nameExists = await Bot.findOne({ name: req.body.name });
        if (nameExists) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: bot já cadastrado"
            });
        }

        const idExists = await Bot.findOne({ id: req.body.id });
        if (idExists) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: id já cadastrado"
            });
        }

        const bot = await Bot.create(req.body, (err) => {
            if (err) return res.status(400).json({
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

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            /* id: Yup.string()
                .min(36)
                .max(36), */
            Name: Yup.string(),
            Id: Yup.string()
                .min(36)
                .max(36)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                messsage: "Dados inválidos"
            });
        }

        const { name, Id, Name = name } = req.body;

        const botExists = await Bot.findOne({ name });

        if (!botExists) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Bot não encontrado"
            });
        }

        if (Id != botExists.Id) {
            const IdExists = await Bot.findOne({ id:Id });
            console.log(IdExists);
            if (IdExists) {
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Esse id já foi cadastrado em outro bot"
                });
            }
        }
        
        if(Name != name){
            const NameExists = await Bot.findOne({name: Name});
            
            if(NameExists){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Esse nome já foi cadastrado em outro bot"
                });
            }
        }

        console.log(Name);

        await Bot.updateOne({ name: name }, {
            id:Id,
            name:Name
        }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Bot não foi editado"
            });

            return res.json({
                error: false,
                message: "Bot editado com sucesso"
            }); 
        });


    }

    async delete(req, res) {
        const botExists = await Bot.findOne({ id: req.params.id });

        if (!botExists) {
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Bot não encontrado"
            });
        }

        const bot = await Bot.deleteOne({ id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
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
