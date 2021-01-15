import { Timestamp } from "mongodb";
import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Definir schema das mensagens

const Message = new Schema({
    conversationId:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
},{
    timestamps: true
});

//Implementação do mongoosePaginate para paginação dos resultados quando listar for requisitado
Message.plugin(mongoosePaginate);

export default model("message",Message);