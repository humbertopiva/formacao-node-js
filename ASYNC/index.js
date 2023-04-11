function enviarEmail(corpo, para, callback) {
    setTimeout(() => {
        console.log(`
        Para: ${para}
        -----------------------
        ${corpo}
        -----------------------
        De: Humberto Beto
        `)

        callback("OK", 5, "8s", "Humberto");
    }, 8000);
};

console.log("Inicio do envio de e-mail!");
enviarEmail("Oi, seja bem vindo ao Guia", "victor@udemy.com", (status, amount, time, nome) => {
    console.log(`
    De: ${nome}
    Status: ${status}
    -----------------
    Contatos: ${amount}
    -----------------
    Tempo de envio: ${time}
    `);
    console.log("Tudo OK!!");
});