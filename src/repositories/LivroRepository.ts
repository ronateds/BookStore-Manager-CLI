import { pool } from '../database/connection';
import { ILivro, ILivroComAutor, Livro } from '../models/Livro';

export class LivroRepository {
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

