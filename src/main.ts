import { pool } from "./database/connection";
import { menuPrincipal } from "./menus/mainMenu";

async function main(): Promise<void> {
    console.log('Iniciando BookStore Manager CLI...');

    // const result = await pool.query('SELECT NOW()');
    // console.log(result.rows[0]);
    await menuPrincipal();

    await pool.end()
}

main();
