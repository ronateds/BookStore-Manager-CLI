import { ICliente } from "../models/Cliente";
import { ILivro } from "../models/Livro";
import { CrudRepository } from "./CrudRepository";
import { pool } from '../database/connection';
import { AppError } from '../utils/AppError';
import { IEmprestimo } from "../models/Emprestimo";

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

    async livrosEmprestados(): Promise<IEmprestimo[]> {
        try {
            const query = "SELECT * FROM emprestimos WHERE data_devolucao IS null";
            const resultado = await pool.query<IEmprestimo>(query);
            return resultado.rows;
        } catch (error) {
            throw new AppError('Erro ao consultar livros emprestados');
        }
    }
}