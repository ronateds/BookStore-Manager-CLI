import { AppError } from "./AppError";

export function tratarErro(error: unknown): void {
    if (error instanceof AppError) {
        console.log(`\n${ error.message }\n`);
    } else {
        console.log('\nOcorreu um erro inesperado ao processar a operação.');
        console.error(error);
    }
}