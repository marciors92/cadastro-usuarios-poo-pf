export class Usuario {
    constructor(nome, email, cep, logradouro, bairro, cidade, uf) {
        this.nome = nome;
        this.email = email;
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }
}

export class Armazenamento {
    static salvarDados(dados) {
        localStorage.setItem('dadosCadastro', JSON.stringify(dados));
    }

    static restaurarDados() {
        const dadosSalvos = localStorage.getItem('dadosCadastro');
        return dadosSalvos ? JSON.parse(dadosSalvos) : null;
    }
}