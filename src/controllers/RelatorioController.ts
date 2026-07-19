import { tratarErro } from "../utils/tratarErro";
import { RelatorioService } from "../services/RelatorioService";
import { gerarCSV } from "../utils/csvHelper";

export class RelatoriosController {
    private relatorioService = new RelatorioService();

    async livrosDisponiveis(): Promise<void> {
        try {
            // buscar livros disponiveis
            const livros = await this.relatorioService.livrosDisponiveis();

            // cria arquivo csv
            const cabecalho = `ID,Título,Ano de Publicação,Quantidade Disponível,Quantidade Total,ID do Autor\n`
            const livrosCsv = livros?.reduce((acc, curr) => {
                acc += `${ curr.id },${ curr.titulo },${ curr.ano_publicacao },${ curr.quantidade_disponivel },${ curr.quantidade_total },${ curr.autor_id }\n`
                return acc
            }, cabecalho);

            const arquivo = await gerarCSV('livros_disponiveis', cabecalho, livrosCsv);

            // imprimir local do arquivo gerado
            console.log(`Relatório de livros disponíveis gerado com sucesso e diponível em:\n${ arquivo.caminho }\n`);
        } catch (error) {
            tratarErro(error);
            return;
        }
    }

    async livrosEmprestados(): Promise<void> {
        try {
            const emprestimos = await this.relatorioService.livrosEmprestados();

            const cabecalho = `ID do Empréstimo,ID Livro,ID Cliente,Data de Empréstimo\n`
            const emprestimosCsv = emprestimos?.reduce((acc, curr) => {
                acc += `${ curr.id },${ curr.livro_id },${ curr.cliente_id },${ curr.data_emprestimo?.toLocaleDateString() }\n`
                return acc
            }, cabecalho);

            const arquivo = await gerarCSV('emprestimos_disponiveis', cabecalho, emprestimosCsv);

            // imprimir local do arquivo gerado
            console.log(`Relatório de emprestimos gerado com sucesso e diponível em:\n${ arquivo.caminho }\n`);
        } catch (error) {
            tratarErro(error);
            return;
        }
    }
}