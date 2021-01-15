import {Schema, model} from "mongoose";

//Definir schema do usuário
const User = new Schema({
    user:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default model("user",User);