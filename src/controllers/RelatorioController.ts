import { tratarErro } from "../utils/tratarErro";
import { RelatorioService } from "../services/RelatorioService";
import { writeFile } from "fs/promises";
import path from "path";

export class RelatoriosController {
    private relatorioService = new RelatorioService();

    async livrosDisponiveis(): Promise<void> {
        try {
            // buscar livros disponiveis
            const livros = await this.relatorioService.livrosDisponiveis();

            // cria arquivo csv
            const cabecalho = `ID,Titulo,Ano de Publicação,Quantidade Disponível, Quantidade Total, ID do Autor\n`
            const livrosCsv = livros?.reduce((acc, curr) => {
                acc += `${ curr.id }, ${ curr.titulo }, ${ curr.ano_publicacao }, ${ curr.quantidade_disponivel }, ${ curr.quantidade_total }, ${ curr.autor_id }\n`
                return acc
            }, cabecalho);

            // Nome do arquivo gerado, com timestamp para diferneciar
            const timestamp = new Date().getTime();
            const arquivo = `livros_disponiveis_${ timestamp}.csv`

            // grava relatório no arquivo, se não tiver livros disponíveis gera um csv só com o cabeçalho
            const pastaRelatorio = path.resolve(process.cwd(), "relatorios");
            const caminhoArquivo = path.join(pastaRelatorio, arquivo);
            await writeFile(caminhoArquivo, livrosCsv ?? cabecalho, 'utf8');

            // imprimir local do arquivo gerado
            console.log(`Relatório de livros disponíveis gerado com sucesso e diponível em:\n${ caminhoArquivo }\n`);
        } catch (error) {
            tratarErro(error);
            return;
        }
    }
}