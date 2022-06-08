const express = require("express"); // Importando o express
const app = express(); // Iniciando o express

// Estou dizendo para o Express usar o EJS como View engine
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {

    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.listen(8080, () => {
    console.log("App rodando!");
});