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
            console.log("aaqui caralho")
            const newMessage = await Message.create({
                conversationId: conversationId,
                from: from,
                to: to,
                text: "Oi, como posso ajudá-lo?"
            }, (err) => {
                if (err) return res.status(400).json({
                    error: true,
                    code: 130,
                    message: err
                });
    
                return res.status(200).json({
                    error: false,
                    message: req.body.text //mensagem recebida pelo  bot
                });
    
            });
        };

        const newMessage = await Message.create({
            conversationId: conversationId,
            from: from,
            to: to,
            text: text
        }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 130,
                message: err
            });

            return res.status(200).json({
                error: false,
                message: req.body.text //mensagem recebida pelo  bot
            });

        });
    }

    async showMessage(req,res){
        const messageExists = await Message.findOne({_id:req.params.id},(err)=>{
            if(err) return res.status(400).json({
                error:true,
                code:140,
                message: "Mensagem não encontrada"
            });
        });
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
        console.log(conversationId);

        if(!conversationId){
            return res.status(400).json({
                error: true,
                code:150,
                message: "ConversationId obrigatório"
            });
        }
        
        const conversationIdExists = Message.find({conversationId:conversationId});

        const { page = 1 } = req.query;
        const { limit = 30 } = req.query;
        await Message.paginate({
            conversationId:conversationId
        }, {
            select: "",
            sort: { field: 'asc', test: 1 },
            page,
            limit
        }).then((messages) => {
            return res.json({
                error: false,
                messages: messages
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Não foi possível processar a solicitação. Returned: " + err
            })
        })
        
        //return res.json(req.query);
    }
}

export default new MessageController();