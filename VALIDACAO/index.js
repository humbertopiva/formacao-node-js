var express = require("express");
var session = require("express-session")
var flash = require("express-flash")
var cookieParser = require("cookie-parser");

var app = express();

var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse ejs
app.set('view engine', 'ejs');

app.use(cookieParser("senhamestre"));

// parse express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


app.use(flash());

app.get("/", (req, res) => {

    var emailError = req.flash("emailError") || undefined;
    var pontosError = req.flash("pontosError") || undefined;
    var nomeError = req.flash("nomeError") || undefined;
    var email = req.flash("email") || "";

    res.render("index", {emailError, pontosError, nomeError, email});
})

app.post("/form", (req, res) => {
    var {email, nome, pontos} = req.body;

    var emailError, pontosError, nomeError;
    
    if(email == undefined || email == "") {
        emailError = "O e-mail não pode ser vazio";
    }

    if(pontos == undefined || pontos < 20) {
        pontosError = "Você não pode ter menos de 20 pontos";
    }

    if(nome == undefined || nome == "") {
        nomeError = "O nome não pode ser vazio."
    }

    if(nome.length < 4) {
        nomeError = "O nome é muito pequeno."
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined) {
        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError", nomeError);

        req.flash("email", email);

        res.redirect("/");
    } else {
        res.send("SHOW DE BOLA ESSE FORM!");
    }
    
})

app.listen(5678, (req, res) => {
    console.log("Servidor rodando!");
})