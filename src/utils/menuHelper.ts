import { select, Separator } from "@inquirer/i18n";

export type opcaoMenu = {
    value: number,
    name: string,
    method?: string
}

/**
 *  Constrói e imprime um cabeçalho para o menu no formato:
 *
 *
    ================================

            BookStore Manager CLI - Exemplo
    ================================
 * @param nome string
 * @param msg string
 */
export function header(nome: string, msg: string | null = null): void {
    console.clear();
    console.log('='.repeat(50) + '\n' + ' '.repeat(5) + `BookStore Manager CLI - ${ nome }\n` + '='.repeat(50) + '\n');
    if (msg) {
        console.log(msg, '\n');
    }
}

/**
 * constrói as opções do menu
 * @param opcoes string[]
 * @returns Array<any>
 */
export async function escolherDoMenu(opcoes: opcaoMenu[]): Promise<number> {
    const opcao = Number(await select({
        message: 'Escolha uma opção',
        loop: false,
        choices: [
            new Separator(),
            ...opcoes
        ]
    }));

    return opcao;
}