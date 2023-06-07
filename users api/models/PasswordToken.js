var knex = require("../database/connection");
var User = require("./User");

class PasswordToken {

    async new(email) {
        try {
            const user = await User.findByEmail(email);

            if(user != undefined) {
                const token = Date.now();

                await knex.insert({
                    userId: user.id,
                    token,
                    used: 0,
                }).table("passwordtoken");

                return {status: true, token}
            } else {
                return {status: false, error: "Não existe usuário com este e-mail."};
            }
        }catch(err) {
            console.log(err);
            return {status: false, error: "Não foi possível criar o token de recuperação de senha."};
        }
    }

    async validate(email, token) {
        try {
            const user = await User.findByEmail(email);

            if(user == undefined) {
                return {status: false, error: "Não foi possível validar o token."};
            }

            const tokens = await knex.select("*").table("passwordtoken").where({userId: user.id, token, used: 0});
            const hasToken = Boolean(tokens.length);

            if(!hasToken) {
                return {status: false, error: "Token inválido."};
            }

            return {status: true, userId: user.id, token: tokens[0]};
        }catch(err) {
            console.log(err);
            return {status: false, error: "Não foi possível validar o token."};
        }
    }

    async setUsed(token) {
        try {
            await knex.update({used: 1}).table("passwordtoken").where({token});
            return {status: true};
        }catch(err) {
            console.log(err);
            return {status: false};
        }
    }

}

module.exports = new PasswordToken();