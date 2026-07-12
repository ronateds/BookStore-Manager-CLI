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
}