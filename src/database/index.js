import mongoose from "mongoose";

class DataBase{
    constructor(){
        this.mongoDataBase();
    }
    mongoDataBase(){
        mongoose.connect("mongodb://localhost/chatbot",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("Conexão com Mongodb realizada com sucesso");
        }).catch((erro) => {
            console.log("Conexão com Mongodb não foi realizada com sucesso. Erro: " + erro);
        });
    }
}

export default new DataBase();