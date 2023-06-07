var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const secret = "ratanaba";

class UserController {
    async all(req, res) {
        const users = await User.all();
        return res.json(users);
    }

    async findById(req, res) {
        const {id} = req.params;
        const user = await User.findById(id);

        if(user == undefined) {
            return res.status(404).json({error: "Usuário não encontrado."});
        } else {
            return res.json(user);
        }
    }

    async create(req, res) {
        const {name, email, password} = req.body;

        if(!email) {
            return res.status(400).json({error: "Email inválido."});
        }

        const userExists = await User.findEmail(email);     
        
        if(userExists) {
            return res.status(406).json({error: "Email já está em uso."});
        }

        await User.new(name, email, password)

        return res.status(200).send("Usuário criado.");
    }

    async edit(req, res) {
        const {id, name, email, role} = req.body;

        const result = await User.update(id, name, email, role);

        if(result?.status) {
            return res.status(200).send("Tudo certo!");
        } else {
            return res.status(406).json(result?.error);
        }
    }

    async destroy(req, res) {
        const {id} = req.params;

        const result = await User.delete(id);

        if(result?.status) {
            return res.status(200).send("Usuário deletado com sucesso.");
        } else {
            return res.status(406).json(result?.error);
        }
    }

    async recoverPassword(req, res) {
        const {email} = req.body;

        const result = await PasswordToken.new(email);

        if(result?.status) {
            return res.status(200).json({token: result.token});
        } else {
            return res.status(406).json(result?.error);
        }
    }

    async changePassword(req, res) {
        const {email, password, token} = req.body;

        const validate = await PasswordToken.validate(email, token);

        if(!validate.status) {
            return res.status(406).json({error: "Não foi possível trocar a senha"});
        }

        const changePassword = await User.changePassword(validate.userId, password);

        if(!changePassword.status) {
            return res.status(406).json({error: "Não foi possível trocar a senha"});
        }

        await PasswordToken.setUsed(token);

        return res.status(200).json({message: "Senha alterada com sucesso."});
    }

    async login(req, res) {
        const {email, password} = req.body;

        const user = await User.findByEmail(email);
        
        if(user == undefined) {
            return res.status(406).json({error: "Email ou usuário incorreto."});
        }

        var compare = await bcrypt.compare(password, user.password);
        
        if(!compare) {
            return res.status(406).json({error: "Email ou usuário incorreto."});
        }

        var token = await jwt.sign({email, role: user.role}, secret);
        
        return res.status(200).json({access_token: token});        
    }


}

module.exports = new UserController();