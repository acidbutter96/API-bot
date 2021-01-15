import * as Yup from "yup";
import Message from "../models/Message";


class MessageController {

    async sendMessage(req, res) {

        const schema = Yup.object().shape({
            conversationId: Yup.string()
                .required(),
            from: Yup.string()
                .required(),
            to: Yup.string()
                .required(),
            from: Yup.string()
                .required(),
            text: Yup.string()
        });

        const { conversationId, from, to, text } = req.body;

        const conversationExists = await Message.findOne({ conversationId: conversationId });

        if(conversationExists){
            const messageSave = await Message.create(req.body);
            console.log(messageSave)
            return res.json({
                error:false,
                data:messageSave
            });
        }

        //simula a primeira frase do bot

        const newMessage = await Message.create({
            conversationId: conversationId,
            from:to, 
            to:from,
            text:"Olá, como posso ajudar?"
        });
        

        return res.status(200).json({
            error:false,
            data: newMessage
        });
        
    }

    async showMessage(req,res){
        //verificar se mensagem foi cadastrada

        const messageExists = await Message.findOne({_id:req.params.id},(err)=>{
            if(err) return res.status(400).json({
                error:true,
                code:140,
                message: "Mensagem não encontrada"
            });
        });

        //resposta da requisição
        return res.json({
            id:messageExists._id,
            conversationId:messageExists.conversationId,
            timestamp: messageExists.createdAt,
            from:messageExists.from,
            to:messageExists.to,
            text:messageExists.text
        });
        
    }

    async showConversation(req,res){

        const {conversationId} = req.query;

        if(!conversationId){
            return res.status(400).json({
                error: true,
                code:150,
                message: "ConversationId obrigatório"
            });
        }
        
        const conversationIdExists = Message.find({conversationId:conversationId});

        //paginação

        const { page = 1 } = req.query;
        const { limit = 30 } = req.query;

        //Query usando paginate e filtrando pelo conversationId retornando as mensagens de forma ascendente

        await Message.paginate({
            conversationId:conversationId
        }, {
            select: "_id conversationId timestamp from to text",
            sort: { field: 'asc', test: 1 },
            page,
            limit
        }).then((messages) => {
            return res.json({
                error: false,
                messages: messages.docs
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 151,
                message: "Não foi possível processar a solicitação. Returned: " + err
            })
        })
        
        //return res.json(req.query);
    }
}

export default new MessageController();