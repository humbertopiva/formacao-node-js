const express = require("express"); // Importando o express
const app = express(); // Iniciando o express

// Estou dizendo para o Express usar o EJS como View engine
app.set("view engine", "ejs");

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8040
    });
});

app.listen(8080, () => {
    console.log("App rodando!")
});