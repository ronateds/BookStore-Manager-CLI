import { IAutor } from "../models/Autor";
import { ILivro } from "../models/Livro";

export function listarTodosAutores(autores: IAutor[]): void {
    autores.forEach(autor => listarAutor(autor));
    console.log();
}

export function listarAutor(autor: IAutor): void {
    console.log(`[${ autor.id }] ${ autor.nome } - ${ autor.nacionalidade }`);
}

export function listarTodosLivros(livros: ILivro[]): void {
    livros.forEach(livro => listarLivro(livro));
    console.log();
}

export function listarLivro(livro: ILivro): void {
    console.log(
        `[${ livro.id }] ${ livro.titulo } (${ livro.ano_publicacao }) - Disponíveis: ${ livro.quantidade_disponivel }/${ livro.quantidade_total }`,
    );
}