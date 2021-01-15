import * as Yup from "yup";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import configAuth from "../../config/auth";


class LoginController {
    async store(req, res) {
        const adminExists = await User.findOne({user: "admin"});

        if(!adminExists){
            await User.create({
                user: "admin",
                password: "$2a$07$j4JI13RczbpdvcVy.qBOMuiAKZRGHE.hGznCHgxKnp44Ny3RZ6Bhe"
            });
        }

        const { user, password } = req.body;

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
                message: "Insira usuário e senha"
            })
        }

        const userExists = await User.findOne({ user: user });

        if (!userExists) {
            return res.status(401).json({
                error: true,
                code: 110,
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

        return res.json({
            id: userExists._id,
            user: userExists.user,
            token: jwt.sign({ id: userExists._id }, configAuth.secret, {expiresIn: configAuth.expiresIn})
        });
    }
}

export default new LoginController();
