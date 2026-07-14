export interface ILivro {
  id: number | undefined;
  titulo: string;
  anoPublicacao: number;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  autorId: number;
}

export class Livro implements ILivro {
  id: number | undefined;
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
    this.id = id;
  }
}

export interface ILivroComAutor extends ILivro {
  nomeAutor: string;
}
