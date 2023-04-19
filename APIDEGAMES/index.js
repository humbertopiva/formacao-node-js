const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const jwt = require("jsonwebtoken");

const JWTSecret = "segredin";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWTSecret, (err, data) => {
            if(err) {
                res.status(401).send("Token inválido");
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });

    } else {
        res.status(401).send("Token inválido.");
    }
}

var DB = {
  games: [
    { id: 23, title: "Skyrim", year: 2011, price: 60 },
    { id: 33, title: "COD", year: 2015, price: 40 },
    { id: 43, title: "LOL", year: 20010, price: 0 },
  ],
  users: [
    {id: 1, name: "Humberto Bebeto", email: "humberto@gmail.com", password: "nodejs<3"},
    {id: 2, name: "Guilherme Gui", email: "guilherme@gmail.com", password: "java123"},
  ]
};

app.get("/games", auth, (req, res) => {
    res.statusCode = 200;
    res.json({user: req.loggedUser, games: DB.games});
})

app.get("/game/:id", (req, res) => {
    const id = req.params.id;

    if(isNaN(id)) {
        res.status(400).json("Formato inválido.");
    }

    let game = DB.games.find(game => game.id == id);

    if(game == undefined) {
        res.status(404).json("Game não encontrado.");
    }

    res.send(game);
})

app.post("/game", (req, res) => {
    const {title, year, price} = req.body;

    DB.games.push({
        id: 2323,
        title,
        price,
        year
    });

    res.sendStatus(200);    
})

app.delete("/game/:id", (req, res) => {
    const { id } = req.params;

    if(isNaN(id)) {
        res.status(400).json("Formato inválido.");
    }

    let game = DB.games.find(game => game.id == id);

    if(game == undefined) {
        res.status(404).json("Game não encontrado.");
    }

    DB.games = DB.games.filter(game => game.id != id);
    res.sendStatus(200);
})

app.put("/game/:id", (req, res) => {
    const id = req.params.id;

    if(isNaN(id)) {
        res.status(400).json("Formato inválido.");
    }

    let game = DB.games.find(game => game.id == id);

    if(game == undefined) {
        res.status(404).json("Game não encontrado.");
    }

    const {title, year, price} = req.body;

    title && (game.title = title); 
    price && (game.price = price); 
    year && (game.year = year); 

    res.sendStatus(200);  
});

app.post("/auth", (req, res) => {

    var {email, password} = req.body;

    if(email != undefined) {
        const user = DB.users.find(user => user.email == email);
        if(user != undefined) {
            
            if(user.password == password) {

                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn:'48h'}, (err, token) => {
                    if(err) {
                        res.status(400).send("Falha interna.");
                    } else {
                        res.status(200).send({token});
                    }
                });

            } else {
                res.status(401);
            }

        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
});

app.listen(45678, () => {
  console.log("API RODANDO");
});