import { menuPrincipal } from "./menus/mainMenu";

async function main(): Promise<void> {
    console.log('Iniciando BookStore Manager CLI...');

    try {
        await menuPrincipal();
    } catch (error) {
        console.error('\n', error);
    }
}

main();
