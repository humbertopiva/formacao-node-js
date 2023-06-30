var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User {

    async all() {
        try {
            return await knex.select(["id", "name", "role", "email"]).from("user");
        }catch(err) {
            console.log(err);
            return [];
        }
    }

    async new(name, email, password) {
        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({name, email, password: hash, role: 0}).table("user");
        }catch(err) {
            console.log(err);
            return err;
        }
    }

    async update(id, name, email, role) {
        try {
            const editUser = {};
            const user = await this.findById(id);
            
            if(email && email != user.email) {
                
                const emailExists = await this.findByEmail(email);

                if(emailExists) {
                    return {status: false, error: "E-mail já está em uso."};
                }

                editUser.email = email;
            }
            
            name && (editUser.name = name);
            role && (editUser.role = role);

            await knex.update(editUser).table("user").where({id});
            
            return {status: true};
        }catch(err) {
            console.log(err);
            return {status: false, error: "Não foi possível editar o usuário."};
        }
    }

    async delete(id) {
        try {
            const user = await this.findById(id);
            
            if(user != undefined) {
                await knex.delete().table("user").where({id});
                return {status: true};
            }else{
                return {status: false, error: "Usuário não existe, portanto não pode ser deletado."}
            }
        }catch(err) {
            console.log(err);
            return {status: false, error: "Não foi possível deletar o usuário."}
        }
    }

    async findEmail(email) {
        try {
            const users = await knex.select("*").from("user").where({email});
            return Boolean(users.length);
        }catch(err) {
            console.log(err);
            return err;
        }
    }

    async findByEmail(email) {
        try {
            const result = await knex.select(["id", "name", "email", "role", "password"]).from("user").where({email});
            if(!!result.length) {
                return result[0];
            } else {
                return undefined;
            }
        }catch(err) {
            console.log(err);
            return undefined;
        }
    }

    async findById(id) {
        try {
            const result = await knex.select(["id", "name", "email"]).from("user").where({id});
            if(!!result.length) {
                return result[0];
            } else {
                return undefined;
            }
        }catch(err) {
            console.log(err);
            return undefined;
        }
    }

    async changePassword(id, newPassword) {
        try {
            const hash = await bcrypt.hash(newPassword, 10);
            await knex.update({password: hash}).table("user").where({id});
            return {status: true};
        }catch(err) {
            console.log(err);
            return {status: false};
        }
    }
}

module.exports = new User();