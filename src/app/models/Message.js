import {Schema, model} from "mongoose";

const Message = new Schema({
    id:{
        type: String,
        required: true
    },
    conversationId:{
        type: String,
        required: true
    },
    timestamp:{
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

export default model("messages",Message);