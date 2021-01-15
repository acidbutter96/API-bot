import * as Yup from "yup";
import bcrypt from "bcryptjs";
import User from "../models/User";


class UserController{
    async store(req,res){

        const schema = Yup.object().shape({
            user: Yup.string()
                .required(),
            password: Yup.string()
                .required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Usuário e senhas obrigatórios"
            });
        }

        const userExists = await User.findOne({user: req.body.user});

        if(userExists){
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: usuário já existe"
            });
        }

        var data = req.body;
        data.password = await bcrypt.hash(data.password,7);

        const bot = await User.create(req.body, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: usuário não cadastrado"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso"
            });
        });
    }
}

export default new UserController();
