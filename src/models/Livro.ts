export interface ILivro {
  id?: number;
  titulo: string;
  anoPublicacao: number;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  autorId: number;
}

export class Livro implements ILivro {
  id?: number;
  titulo: string;
  anoPublicacao: number;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  autorId: number;

  constructor(
    titulo: string,
    anoPublicacao: number,
    quantidadeTotal: number,
    quantidadeDisponivel: number,
    autorId: number,
    id?: number,
  ) {
    this.titulo = titulo;
    this.anoPublicacao = anoPublicacao;
    this.quantidadeTotal = quantidadeTotal;
    this.quantidadeDisponivel = quantidadeDisponivel;
    this.autorId = autorId;
    if (id !== undefined) this.id = id;
  }
}

export interface ILivroComAutor extends ILivro {
  nomeAutor: string;
}