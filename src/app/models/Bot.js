import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Definir schema dos bots
const Bot = new Schema({   
    name: {
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

//Implementação do mongoosePaginate para paginação dos resultados quando listar for requisitado
Bot.plugin(mongoosePaginate);

export default model("bot", Bot);