var database = require("./database");

// INSERT 
// var dados = [

//     {
//         nome: "Wow",
//         preco: 55.67,
//     },    
//     {
//         nome: "Minecraft",
//         preco: 60,
//     },    
//     {
//         nome: "The Sims",
//         preco: 75,
//     }    
// ]

// var query = database.insert(dados).into("games").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err)
// });

// SELECT
// database.select(["id", "preco"]).table("games").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })


// NESTEDS QUERIES
// database.insert({nome: "Mists of noyah", preco: 35}).into("games").then(data => {
//     database.select(["id", "preco"]).table("games").then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     });

// }).catch(err => {
//     console.log(err)
// });


// WHERE 
// database
//     .select(['id', 'preco'])
//     .whereRaw("nome = 'Mists of noyah' OR preco > 120")
//     .table("games").then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     });

// RAW
// database.raw("SELECT * FROM games").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

// DELETE
// database.where({id: 3}).delete().table("games").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

// UPDATE
// database.where({id: 5}).update({preco: 40}).table("games").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// }); 

// ORDER BY
// database.select().table("games").orderBy("nome", "desc").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

// ASSOCIATED INSERTS
// database
//     .insert({
//         nome: "Blizzard", 
//         game_id: 7
//     }).table("estudios").then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     });

// INNER JOIN 1:1
// database
//     .select(["games.*", "estudios.id as estudio_id",  "estudios.nome as estudios_nome"])
//     .table("games")
//     .innerJoin("estudios", "estudios.game_id", "games.id").then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     })

// INNER JOIN 1:N
// database
//     .select(["games.*", "estudios.id as estudios_id",  "estudios.nome as estudios_nome"])
//     .table("games")
//     .innerJoin("estudios", "estudios.game_id", "games.id").then(data => {
//         const estudiosGamesArray = data;

//         const {id, nome} = data[0];

//         const game = {
//             id,
//             nome,
//             estudios: []
//         }

//         game.estudios = estudiosGamesArray.map(({estudios_id, estudios_nome}) => {
//             return {
//                 id: estudios_id,
//                 nome: estudios_nome,
//             }
//         })

//         console.log(game);

//     }).catch(err => {
//         console.log(err);
//     })


// INNER JOIN N:N
// database
//     .select([
//         "estudios.nome AS estudio_nome",
//         "games.nome AS game_nome",
//         "games.preco"
//     ])
//     .table("games_estudios")
//     .innerJoin("games", "games.id", "games_estudios.game_id")
//     .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id")
//     .then(data => {

//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     })

// TRANSACTION
// async function testeTransacao() {

//     try {
//         await database.transaction(async trans => {
//             await trans.insert({nome: "Qualquer nome1"}).table("estudios");
//             await trans.insert({nome: "Qualquer nome2"}).table("estudios");
//             await trans.insert({id: 1, nome: "Qualquer nome3"}).table("estudios");
//             await trans.insert({nome: "Qualquer nome4"}).table("estudios");
//         });
//     }catch(err) {
//         console.log(err);
//     }

// }

// testeTransacao();