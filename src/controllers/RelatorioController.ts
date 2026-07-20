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

    async livrosPorAutor(): Promise<void> {
        try {
            // buscar livros disponiveis
            const livros = await this.relatorioService.livrosPorAutor();

            // cria arquivo csv
            const cabecalho = `ID,Autor,Livros\n`
            const livrosCsv = livros?.reduce((acc, curr) => {
                acc += `${ curr.id },${ curr.nome },${ curr.livros }\n`
                return acc
            }, cabecalho);

            const arquivo = await gerarCSV('livros_por_autor', cabecalho, livrosCsv);

            // imprimir local do arquivo gerado
            console.log(`Relatório de livros por autor gerado com sucesso e diponível em:\n${ arquivo.caminho }\n`);
        } catch (error) {
            tratarErro(error);
            return;
        }
    }

    async emprestimosPorLivro(): Promise<void> {
        try {
            const emprestimos = await this.relatorioService.emprestimosPorLivro();

            // cria arquivo csv
            const cabecalho = `ID Livro,Título,Empréstimos\n`
            const emprestimosCsv = emprestimos?.reduce((acc, curr) => {
                acc += `${ curr.livro_id },${ curr.titulo },${ curr.emprestimos }\n`
                return acc
            }, cabecalho);

            const arquivo = await gerarCSV('emprestimos_por_livro', cabecalho, emprestimosCsv);

            // imprimir local do arquivo gerado
            console.log(`Relatório de empréstimos por livro gerado com sucesso e diponível em:\n${ arquivo.caminho }\n`);
        } catch (error) {
            tratarErro(error);
            return;
        }
    }

    async emprestimosAtivos(): Promise<void> {
        try {
            const emprestimos = await this.relatorioService.emprestimosAtivos();

            // cria arquivo csv
            const cabecalho = `Empréstimo ID,Cliente ID,Nome,Email,Data Empréstimo\n`
            const emprestimosCsv = emprestimos?.reduce((acc, curr) => {
                acc += `${ curr.emprestimo_id },${ curr.cliente_id },${ curr.nome },${ curr.email },${ curr.data_emprestimo.toLocaleDateString() }\n`
                return acc
            }, cabecalho);

            const arquivo = await gerarCSV('emprestimos_ativos', cabecalho, emprestimosCsv);

            // imprimir local do arquivo gerado
            console.log(`Relatório de empréstimos ativos gerado com sucesso e diponível em:\n${ arquivo.caminho }\n`);
        } catch (error) {
            tratarErro(error);
            return;
        }
    }
}