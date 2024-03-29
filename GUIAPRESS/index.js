const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database.js");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const userController = require("./users/UserController");

const Article = require("./articles/Article");
const Category = require("./categories/Category")
const User = require("./users/User")

// View engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: "qualquercoisa", cookie: {maxAge: 360000}
}));

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    }) 

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", userController);

app.get("/", (req, res) => {

    Article.findAll({
        limit: 4,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            
            res.render("index", {articles, categories});
        });
    });
    
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article, categories});
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
    
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined) {

            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories})
            });

        } else {
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
});

app.listen(8080, () => {
    console.log("O servidor está rodando");
});