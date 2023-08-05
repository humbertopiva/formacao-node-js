const mongoose = require("mongoose");
const articleModel = require("./article");

mongoose.connect("mongodb://localhost:27017/aprendendomongo");

const Article = mongoose.model("Article", articleModel);

// FIND
// Article.find().then(articles => {
//     console.log(articles);
// }).catch(err => {
//     console.log(err);
// })

// DELETE
// Article.findByIdAndDelete("64cdfdf088c7729dc54e3da9").then(response => {
//     console.log("Successfully Deleted.");
// }).catch(err => {
//     console.log(err);
// })

// UPDATED
// Article.findByIdAndUpdate("64cdfdef6965c4af0564a17c", {title: "NOVO TITULO"}).then(response => {
//     console.log("Successfully Updated");
// }).catch(err => {
//     console.log(err);
// });