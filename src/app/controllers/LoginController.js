import bcrypt from "bcryptjs";
import User from "../models/User";

class LoginController{
    async store(res,req){
        const {user, password} = req.body;
        

        return res.status(401).json({

        })
    }
}

export default new LoginController();