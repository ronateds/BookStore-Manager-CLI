import { pool } from "./database/connection";
import { menuPrincipal } from "./menus/mainMenu";

async function main(): Promise<void> {
    console.log('Iniciando BookStore Manager CLI...');

    try {
        await menuPrincipal();
    } catch (error) {
        console.error('\n', error);
    } finally {
        console.log('encerrando');
        await pool.end();
        process.exit()
    }
}

main();
