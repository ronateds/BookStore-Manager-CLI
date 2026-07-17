import { IAutor } from "../models/Autor";
import { ICliente } from "../models/Cliente";
import { IEmprestimo } from "../models/Emprestimo";
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

export function listarTodosClientes(clientes: ICliente[]): void {
    clientes.forEach(cliente => listarCliente(cliente));
    console.log();
}

export function listarCliente(cliente: ICliente): void {
    console.log(`[${ cliente.id }] ${ cliente.nome } - ${ cliente.email }`);
}

export function listarTodosEmprestimos(emprestimos: IEmprestimo[]): void {
    emprestimos.forEach(emprestimo => listarEmprestimo(emprestimo));
    console.log();
}

export function listarEmprestimo(emprestimo: IEmprestimo): void {
    console.log(`[${ emprestimo.id }] Cliente: ${ emprestimo.cliente_id } Data: ${ emprestimo.data_emprestimo } Devolução: ${ emprestimo.data_devolucao }`);
}