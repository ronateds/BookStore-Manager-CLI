import { pool } from '../database/connection';
import { Autor, IAutor } from '../models/Autor';

export class AutorRepository {
    async listarTodos(): Promise<Autor[]> {
        try {
            const resultado = await pool.query<IAutor>(`SELECT * FROM autores`);
            return resultado.rows;
        } catch (error) {
            throw error
        }
    }

    async cadastrar(autor: Omit<IAutor, "id">): Promise<Autor | undefined> {
        const resultado = await pool.query<IAutor>(
            `INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *`,
            [autor.nome, autor.nacionalidade],
        );
        return resultado.rows[0];
    }

    async buscarPorId(id: number): Promise<Autor | undefined> {
        const resultado = await pool.query<IAutor>(`SELECT * FROM autores WHERE id = $1`, [id]);
        return resultado.rows[0];
    }

    async atualizar(autor: IAutor): Promise<Autor | undefined> {
        const resultado = await pool.query<IAutor>(
            `UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *`,
            [autor.nome, autor.nacionalidade, autor.id],
        );
        return resultado.rows[0];
    }

    async remover(id: number): Promise<boolean> {
        const resultado = await pool.query<IAutor>(`DELETE FROM autores WHERE id = $1`, [id]);
        return (resultado.rowCount ?? 0) > 0;
    }

    async possuiLivrosVinculados(id: number): Promise<boolean> {
        const resultado = await pool.query(`SELECT 1 FROM livros WHERE autor_id = $1 LIMIT 1`, [id]);
        return resultado.rows.length > 0;
    }
}