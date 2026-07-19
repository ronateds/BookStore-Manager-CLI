import { writeFile } from "fs/promises";
import path from "path";
import { AppError } from "./AppError";

type retornoCSV = {
    caminho: string
}

export async function gerarCSV(nomeArquivo: string, cabecalho: string, arquivoCsv?: string): Promise<retornoCSV> {
    try {
        const timestamp = new Date().getTime();
        const arquivo = `${nomeArquivo}_${ timestamp }.csv`

        // grava relatório no arquivo, se não tiver dados disponíveis gera um csv só com o cabeçalho
        const pastaRelatorio = path.resolve(process.cwd(), "relatorios");
        const caminhoArquivo = path.join(pastaRelatorio, arquivo);
        await writeFile(caminhoArquivo, arquivoCsv ?? cabecalho, 'utf8');

        return { caminho: caminhoArquivo }
    } catch (error) {
        throw new AppError('Erro ao gerar relatório')
    }
}