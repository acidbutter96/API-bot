import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

Bot.plugin(mongoosePaginate);

export default model("bot", Bot);