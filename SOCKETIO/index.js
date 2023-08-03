var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", socket => {
    socket.on("disconnect", data => {
        console.log(`${socket.id} se desconectou`);
    })

    socket.on("boasvindas", data => {
        console.log(data);
    })

    socket.on("palavra", data => {
        socket.emit("resultado", `${data} é o resultado.`);
    })
})

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index");
});

http.listen(3000, () => {
    console.log("APP RODANDO!");
});