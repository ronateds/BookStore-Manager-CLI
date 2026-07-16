import { pool } from "../database/connection";

export async function encerrrar(): Promise<never> {
    console.clear();
    console.log('\nEncerrando a aplicação. Até logo!\n');
    await pool.end();
    process.exit()
}