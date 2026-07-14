import { pool } from '../database/connection';
import { ILivro, ILivroComAutor, Livro } from '../models/Livro';

export class LivroRepository {
    async criar(livro: ILivro): Promise<Livro> {
    const resultado = await pool.query(
      `INSERT INTO livros (titulo, ano_publicacao, quantidade_total, quantidade_disponivel, autor_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [livro.titulo, livro.anoPublicacao, livro.quantidadeTotal, livro.quantidadeDisponivel, livro.autorId],
    );
    return resultado.rows[0];
  }
      
    async listarTodos(): Promise<ILivroComAutor[]> {
    const resultado = await pool.query<ILivroComAutor>(
        `SELECT l.*, a.nome AS nome_autor
       FROM livros l
       INNER JOIN autores a ON a.id = l.autor_id
       ORDER BY l.id ASC`,
    );
    return resultado.rows;
  }
}

