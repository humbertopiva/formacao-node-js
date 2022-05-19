const express = require("express"); // Importando o express
const app = express(); // Iniciando o express

app.get("/", function(req, resp) {
    resp.send("<h1>Bem vindo ao guia do programador</h1>");
});

app.get("/blog/:artigo?", function(req, resp) {
    
    var artigo = req.params.artigo;

    if(artigo) {
        resp.send("<h2>Artigo: " + artigo + "</h2>");
    } else {
        resp.send("<h3>Bem vindo ao meu blog!: www.guiadoprogramador.com</h3>");
    }
})

app.get("/canal/youtube", function(req, resp) {
    var canal = req.query["canal"];
    if(canal) {
        resp.send(canal);
    } else {
        resp.send("Nenhum canal fornecido");
    }
})

app.get("/ola/:nome/:empresa", function(req, resp) {
    // REQ => DADOS ENVIADOS PELO USUÁRIO
    // RESP => RESPOSTA QUE VAI SER ENVIADA PARA O USUÁRIO
    var nome = req.params.nome;
    var empresa = req.params.empresa;
    resp.send("<h1> Oi " + nome + " da " + empresa + " </h1>");
})



app.listen(4000, function(erro) {
    if(erro) {
        console.log("Ocorreu um erro!");
    } else {
        console.log("Servidor iniciado com sucesso!");
        
    }
})