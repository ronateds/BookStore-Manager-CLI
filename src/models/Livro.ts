export interface ILivro {
  id: number;
  titulo: string;
  ano_publicacao: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  autor_id: number;
}

export class Livro implements ILivro {
  id: number;
  titulo: string;
  ano_publicacao: number;
  quantidade_total: number;
  quantidade_disponivel: number;
  autor_id: number;

  constructor(
    id: number,
    titulo: string,
    ano_publicacao: number,
    quantidade_total: number,
    quantidade_disponivel: number,
    autor_id: number,
  ) {
    this.id = id
    this.titulo = titulo;
    this.ano_publicacao = ano_publicacao;
    this.quantidade_total = quantidade_total;
    this.quantidade_disponivel = quantidade_disponivel;
    this.autor_id = autor_id;
  }
}

export interface ILivroComAutor extends ILivro {
  nomeAutor: string;
}