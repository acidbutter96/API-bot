//Controlador e gerenciador das sessões de login na área restrita (gerenciamento dos bots)

import * as Yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import configAuth from "../../config/auth";


class LoginController {

    async store(req, res) {
        //na primeira execução verifica se há usuário administrador padrão cadastrado no banco de dados, caso não, faz o cadastro para poder seguir com o login na sessão administrativa, numa implementação real essa parte do código não estaria definida

        const adminExists = await User.findOne({user: "admin"});

        if(!adminExists){
            await User.create({
                user: "admin",
                password: "$2a$07$j4JI13RczbpdvcVy.qBOMuiAKZRGHE.hGznCHgxKnp44Ny3RZ6Bhe"
            });
        }

        //Validar sessão a partir do user e password requisitado

        const { user, password } = req.body;

        //Filtro e validação usando a dependência yup

        const schema = Yup.object().shape({
            user: Yup.string()
            .required(),
            password: Yup.string()
                .required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Insira usuário e senha"
            })
        }

        const userExists = await User.findOne({ user: user });

        if (!userExists) {
            return res.status(401).json({
                error: true,
                code: 106,
                message: "Usuário não cadastrado, entrar em contato com adm do sistema"
            });
        }

        if (!(await bcrypt.compare(password, userExists.password))) {
            return res.status(401).json({
                error: true,
                code: 111,
                message: "Senha inválida"
            });
        }

        console.log(req.botID);

        return res.json({
            id: userExists._id,
            user: userExists.user,
            token: jwt.sign({ id: userExists._id }, configAuth.secret, {expiresIn: configAuth.expiresIn})
        });
    }
}

export default new LoginController();
