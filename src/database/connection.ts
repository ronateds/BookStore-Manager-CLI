import 'dotenv/config';
import { Pool, PoolConfig } from 'pg';
import { readFileSync } from "fs";
import { AppError } from '../utils/AppError';

export let pool: Pool;

export async function configurarPool(isLocalPG: boolean = false) {
    try {
        const config: PoolConfig = {
            host: process.env.PGHOST,
            port: Number(process.env.PGPORT),
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            max: 10,
            idleTimeoutMillis: 30000,
        };

        if (!isLocalPG) {
            config.ssl = {
                rejectUnauthorized: true,
                ca: readFileSync("ca.pem").toString(),
            }
        }

        pool = new Pool(config);

        pool.on('error', (err) => {
            console.error('Erro pool:', err);
        });
    } catch (error) {
        throw new AppError('Erro ao criar pool.');
    }
}

export async function testarConexao(): Promise<void> {
    try {
        await pool.query('SELECT now()');
    } catch (error) {
        throw new AppError('Erro ao conectar com o banco de dados.');
    }
}