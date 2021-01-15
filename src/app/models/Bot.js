import {Schema, model} from "mongoose";

const Bot = new Schema({   
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default model("bot", Bot);