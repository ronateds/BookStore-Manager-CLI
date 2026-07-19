export interface IAutor {
    id: number;
    nome: string;
    nacionalidade: string;
}

export interface ILivrosPorAutor {
    id: number;
    nome: string;
    livros: number;
}

export class Autor implements IAutor {
    id: number;
    nome: string;
    nacionalidade: string;

    constructor(id: number, nome: string, nacionalidade: string) {
        this.id = id;
        this.nome = nome;
        this.nacionalidade = nacionalidade;
    }
}