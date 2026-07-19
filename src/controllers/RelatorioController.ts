import { tratarErro } from "../utils/tratarErro";
import { RelatorioService } from "../services/RelatorioService";

export class RelatoriosController {
    private relatorioService = new RelatorioService();

    async livrosDisponiveis(): Promise<void> {
        try {
            // buscar livros disponiveis
            const livros = await this.relatorioService.livrosDisponiveis();
            console.log(livros);

            // criar e/ou colocar em um arquivo csv

            // imprimir local do arquivo gerado
        } catch (error) {
            tratarErro(error);
            return;
        }
    }
}