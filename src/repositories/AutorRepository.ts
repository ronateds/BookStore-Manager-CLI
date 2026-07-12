import { pool } from '../database/connection';
import { Autor, IAutor } from '../models/Autor';

export class AutorRepository {
    async listarTodos(): Promise<Autor[]> {
        const resultado = await pool.query<IAutor>(`SELECT * FROM public.autores`);
        return resultado.rows;
    }
}