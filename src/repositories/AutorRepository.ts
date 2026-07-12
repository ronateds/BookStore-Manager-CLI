import { pool } from '../database/connection';
import { Autor, IAutor } from '../models/Autor';

export class AutorRepository {
    async listarTodos(): Promise<Autor[]> {
        const resultado = await pool.query<IAutor>(`SELECT * FROM public.autores`);
        return resultado.rows;
    }

    async cadastrar(autor: IAutor): Promise<Autor | undefined> {
        const resultado = await pool.query<IAutor>(
            `INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *`,
            [autor.nome, autor.nacionalidade],
        );
        return resultado.rows[0];
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        const resultado = await pool.query(`SELECT * FROM autores WHERE id = $1`, [id]);
        if (resultado.rows.length === 0) return null;
        return resultado.rows[0];
    }

    async atualizar(id: number, autor: IAutor): Promise<Autor | null> {
        const resultado = await pool.query(
            `UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *`,
            [autor.nome, autor.nacionalidade, id],
        );
        if (resultado.rows.length === 0) return null;
        return resultado.rows[0];
    }

    async remover(id: number): Promise<boolean> {
        const resultado = await pool.query(`DELETE FROM autores WHERE id = $1`, [id]);
        return (resultado.rowCount ?? 0) > 0;
    }

    async possuiLivrosVinculados(id: number): Promise<boolean> {
        const resultado = await pool.query(`SELECT 1 FROM livros WHERE autor_id = $1 LIMIT 1`, [id]);
        return resultado.rows.length > 0;
    }
}