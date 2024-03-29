const express = require('express');
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify")
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/articles/", adminAuth, (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {

        res.render("admin/articles/index", {articles})
    })
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories})
    })
})

router.post("/articles/save", adminAuth, (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;

    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId,
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)) {
        res.redirect("admin/articles");
    }

    Article.findByPk(id, {include: [{model: Category}]}).then(article => {
        if(article != undefined) {

            Category.findAll().then(categories => {

                res.render("admin/articles/edit", {article, categories});
            })

        } else {
            res.redirect("/admin/articles");
        }
    }).catch(err => {
        res.redirect("/");
    })

});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;


    if(title != undefined) {

        Article.update({
            title, 
            body,
            slug: slugify(title),
            categoryId,
        },
        {
            where: {
                id,
            }
        }).then(() => {
            res.redirect("/admin/articles")
        })
    } else {
        res.redirect("/admin/articles");
    }
})

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;

    if(id != undefined) {
        if(!isNaN(id)) { // SE É UM NÚMERO
            Article.destroy({
                where: {
                    id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            });
        } else { // NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    } else { // NULL
        res.redirect("/admin/articles");
    }

})

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    var offset = 0;
    
    if(!isNaN(page) && page > 1) {
        offset = (parseInt(page) - 1) * 4;
    }


    Article.findAndCountAll({
        limit: 4,
        offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        var next;
        if(offset + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }
    
        var result = {
            page: parseInt(page),
            next,
            articles,
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result, categories})
        });
    });
})

module.exports = router;