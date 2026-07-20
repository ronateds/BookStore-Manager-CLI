import { AppError } from "./AppError";

export function tratarErro(error: any): void {
    if (error instanceof AppError) {
        console.log(`\n${ error.message }\n`);
        return;
    }

    const code = error?.code;
    if (code) {
        let message;

        switch (code) {
            case '23505':
                message = 'Registro duplicado. Verifique valores únicos.';
                break;
            case '23503':
                message = 'Violação de integridade referencial.';
                break;
            case '23502':
                message = 'Campo obrigatório ausente.';
                break;
            default:
                message = `Erro (código ${ code }).`;
        }

        console.log(`\n${ message }\n`);
        if (process.env.DEBUG === 'true') {
            console.debug(error.stack ?? error);
        }
        return;
    }

    if (error instanceof Error) {
        console.error('\nOcorreu um erro inesperado ao processar a operação:');
        console.error(error.message, '\n');
        if (process.env.DEBUG === 'true') {
            console.debug(error.stack);
        }
        return;
    }

    console.error('\nOcorreu um erro inesperado ao processar a operação.\n');
}