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
    const resultado = await pool.query(
      `SELECT l.*, a.nome AS nome_autor
       FROM livros l
       INNER JOIN autores a ON a.id = l.autor_id
       ORDER BY l.id ASC`,
    );
    return resultado.rows;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const resultado = await pool.query(`SELECT * FROM livros WHERE id = $1`, [id]);
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async atualizar(id: number, livro: ILivro): Promise<Livro | null> {
    const resultado = await pool.query(
      `UPDATE livros
       SET titulo = $1, ano_publicacao = $2, quantidade_total = $3,
           quantidade_disponivel = $4, autor_id = $5
       WHERE id = $6 RETURNING *`,
      [livro.titulo, livro.anoPublicacao, livro.quantidadeTotal, livro.quantidadeDisponivel, livro.autorId, id],
    );
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async remover(id: number): Promise<boolean> {
    const resultado = await pool.query(`DELETE FROM livros WHERE id = $1`, [id]);
    return (resultado.rowCount ?? 0) > 0;
  }

  async possuiEmprestimosVinculados(id: number): Promise<boolean> {
    const resultado = await pool.query(`SELECT 1 FROM emprestimos WHERE livro_id = $1 LIMIT 1`, [id]);
    return resultado.rows.length > 0;
  }
  
}

