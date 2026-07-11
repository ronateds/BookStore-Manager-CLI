export interface IAutor {
    id?: number | undefined;
    nome: string;
    nacionalidade: string;
}

export class Autor implements IAutor {
    id?: number | undefined;
    nome: string;
    nacionalidade: string;

    constructor(nome: string, nacionalidade: string, id?: number) {
        this.id = id;
        this.nome = nome;
        this.nacionalidade = nacionalidade;
    }
}