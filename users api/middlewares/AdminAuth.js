var jwt = require("jsonwebtoken");
const secret = "ratanaba";

module.exports = function(req, res, next) {
    const authorization = req.headers['authorization'];

    if(authorization) {
        const bearer = authorization.split(" ");
        const token = bearer[1];

        try {
            const decoded = jwt.verify(token, secret); 

            if(decoded.role != 1){
                return res.status(403).send("Você não está autorizado");
            }

            next()
        }catch(err){
            return res.status(403).send("Você não está autorizado");
        }

        next();
    }else{
        return res.status(403).send("Você não está autorizado");
    }
}