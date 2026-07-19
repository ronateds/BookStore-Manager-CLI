import { ICliente } from "../models/Cliente";
import { ILivro } from "../models/Livro";
import { CrudRepository } from "./CrudRepository";
import { pool } from '../database/connection';
import { AppError } from '../utils/AppError';

export class RelatorioRepository {
    async livrosDisponiveis(): Promise<ILivro[]> {
        try {
            const query = "SELECT * FROM livros WHERE quantidade_disponivel > 0";
            const resultado = await pool.query<ILivro>(query);
            return resultado.rows;
        } catch (error) {
            throw new AppError('Erro ao consultar livros disponíveis');
        }
    }
}