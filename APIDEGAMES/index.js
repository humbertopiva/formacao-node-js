const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
  games: [
    { id: 23, title: "Skyrim", year: 2011, price: 60 },
    { id: 33, title: "COD", year: 2015, price: 40 },
    { id: 43, title: "LOL", year: 20010, price: 0 },
  ],
};

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
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
})

app.listen(45678, () => {
  console.log("API RODANDO");
});