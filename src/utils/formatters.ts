import { IAutor } from "../models/Autor";

export function listarTodosAutores(autores: IAutor[]): void {
    autores.forEach(autor => listarAutor(autor));
    console.log();
}

export function listarAutor(autor: IAutor): void {
    console.log(`[${ autor.id }] ${ autor.nome } - ${ autor.nacionalidade }`);
}