class Filme {
    constructor(titulo, ano, genero, diretor, atores, duracao) {
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.diretor = diretor;
        this.atores = atores;
        this.duracao = duracao;
    }

    Reproduzir() {
        console.log("Reproduzindo....");
    }

    Pausar() {
        console.log("Pausado ||");
    }

    Avançar() {
        console.log("Avançar >>");
    }

    Fechar() {
        console.log("Fechar X");
    }

    Ficha() {
        console.log(`Titulo: ${this.titulo}`);
        console.log(`Ano de lançamento: ${this.ano}`);
        console.log(`Genero: ${this.genero}`);
        console.log(`Diretor: ${this.diretor}`);
        console.log(`Atores: ${this.atores}`);
        console.log(`Duracao: ${this.duracao}`);
    }
}

var vingadores = new Filme("Vingadores 2", 2014, "Ação", "Alguém", "2h");

var batman = new Filme();

batman.titulo = "Batman";
batman.ano = "2009";
batman.genero = "Ação";

var starWars = new Filme();