import { pool } from "./database/connection";

async function main(): Promise<void> {
    console.log('Iniciando BookStore Manager CLI...');

    const result = await pool.query('SELECT NOW()');
    console.log(result.rows[0]);

    await pool.end()
}

main();
