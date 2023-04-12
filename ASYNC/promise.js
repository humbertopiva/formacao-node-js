function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5);
        }, 1500)
    })
}

function buscarEmailNoBanco(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("victorlima@guia.com.br")
        }, 2000)
    });
}

function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            var deuErro = false;
            
            if(!deuErro) {
                resolve({time: 6, to: "victor@udemy.com"}); // Promessa ok!
            } else {
                reject("Fila cheia"); // Foi mal, eu falhei :()
            }
        }, 4000)
    });
}

function pegarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve([
                {name: "Victor", lang: "JS"},
                {name: "Lima", lang: "C#"},
                {name: "DANIEL", lang: "Java"}
            ])
        }, 3000)
    })
}

// promise hell
// pegarId().then((id) => {
//     buscarEmailNoBanco(id).then((email) => {

//         enviarEmail("Olá, como vai?", email).then(() => {
//             console.log("Email enviado, para o usuário com id:" + id)
//         }).catch(err => {
//             console.log(err);
//         })
//     });
// })

async function principal() {
    const id = await pegarId();
    const email = await buscarEmailNoBanco(id);
    
    try{
        await enviarEmail("Olá, como vai", email);
        console.log("Email enviado com sucesso!")
    }catch(error){
        console.log(error);
    }
}

principal();