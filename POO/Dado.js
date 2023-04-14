class Dados {
    constructor(faces) {
        this.faces = faces;
    }


    Rolar() {
        const max = Math.floor(this.faces);

        return Math.ceil(Math.random() * max);
    }
}

const dados = new Dados(6);
console.log(dados.Rolar());