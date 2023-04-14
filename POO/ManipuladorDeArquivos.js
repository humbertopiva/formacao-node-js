class Leitor{
    Ler(caminho) {
        console.log("Conteúdo do arquivo!");
    }
}
class Escritor{
    Escrever(arquivo, conteudo) {
        console.log("Conteúdo escrito!");
    }
}
class Criador{
    Criar(nome) {
        console.log("Arquivo criado!");
    }
}

class CriadorDePdf {
    Criar() {
        console.log("Criando PDF...");
    }
}

class Destruidor{
    Deletar(nome) {
        console.log("Deletando arquivo!");
    }
}

class ManipuladorDeArquivo{
    constructor(nome) {
        this.arquivo = nome;
        this.leitor = new Leitor();
        this.escritor = new Escritor();
        this.criador = new Criador();
        this.destruidor = new Destruidor();
    }
}

class GerenciadorDeUsuarios{
    constructor() {
        this.criador = new CriadorDePdf();
        this.escritor = new Escritor();
    }

    SalvarListaDeUsuarios(lista) {
        this.criador.Criar("usuarios.txt");
        this.escritor.Escrever("usuarios.txt", lista);
    }
}

var manipulador = new ManipuladorDeArquivo("meuarquivo.txt");

manipulador.leitor.Ler();
manipulador.escritor.Escrever();
manipulador.criador.Criar();
manipulador.destruidor.Deletar();