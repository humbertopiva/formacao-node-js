function enviarEmail(corpo, para, callback) {
    setTimeout(() => {
        var deuErro = false;

        if(deuErro) {
            callback(12, "O envio de e-mail falhou!");
        } else {
            callback(12)
        }
    }, 8000);
};

console.log("Inicio do envio de e-mail!");
enviarEmail("Oi, seja bem vindo ao Guia", "victor@udemy.com", (time, erro) => {
    if(erro == undefined) {
        console.log("TUDO OK!");
        console.log(`Tempo: ${time}s`)
    }else{
        console.log("Ocorreu um erro: " + erro);
    }
});