import { pool } from '../database/connection';
import { AppError } from '../utils/AppError';

export abstract class CrudRepository<T extends object> {
    protected constructor(protected readonly tabela: string) { }

    // INSERT INTO table (coluna_1, coluna_2) VALUES $1 $2

    // CREATE

    protected async create(data: Omit<T, 'id'>): Promise<T | undefined> {
        try {
            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = Object.keys(data).map((_, index) => `$${ index + 1 }`).join(', ');

            const resultado = await pool.query<T>(
                `INSERT INTO ${ this.tabela } (${ columns.join(', ') }) VALUES (${ placeholders }) RETURNING *`,
                values,
            );

            return resultado.rows[0];
        } catch (error) {
            throw new AppError(`Erro ao adicionar na tabela ${ this.tabela }`);
        }
    }

    // READ
    protected async readAll(): Promise<T[]> {
        try {
            const resultado = await pool.query<T>(`SELECT * FROM ${ this.tabela }`);
            return resultado.rows;
        } catch (error) {
            throw new AppError(`Erro ao procurar ${ this.tabela }`);
        }
    }

    protected async readById(id: number): Promise<T | undefined> {
        try {
            const resultado = await pool.query<T>(
                `SELECT * FROM ${ this.tabela } WHERE id = $1`,
                [id],
            );
            return resultado.rows[0];
        } catch (error) {
            throw new AppError(`Erro ao procurar ${ this.tabela }`);
        }
    }

    // UPDATE
    protected async update(id: number, data: T): Promise<T | undefined> {
        try {
            const columns = Object.keys(data);
            const values = Object.values(data);
            const changes = columns.map((column, index) => `${ column } = $${ index + 1 }`).join(', ');

            const resultado = await pool.query<T>(
                `UPDATE ${ this.tabela } SET ${ changes } WHERE id = $${ columns.length + 1 } RETURNING *`,
                [...values, id],
            );

            return resultado.rows[0];
        } catch (error) {
            throw new AppError(`Erro ao atualizar ${ this.tabela }`);
        }
    }

    // DELETE
    
    protected async delete(id: number): Promise<boolean> {
        try {
            const resultado = await pool.query(`DELETE FROM ${ this.tabela } WHERE id = $1`, [id]);
            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new AppError(`Erro ao deletar na tabela ${ this.tabela }`);
        }
    }
}