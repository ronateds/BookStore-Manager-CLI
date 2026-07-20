import { configurarPool, testarConexao } from "./database/connection";
import { menuPrincipal } from "./menus/mainMenu";
import { tratarErro } from "./utils/tratarErro";

async function main(): Promise<void> {
    console.log('Iniciando BookStore Manager CLI...');

    try {
        const isLocalPG = process.argv[2] === 'local' ? true : false;

        await configurarPool(isLocalPG);
        await testarConexao();
        await menuPrincipal();
    } catch (error) {
        tratarErro(error)
    }
}

main();