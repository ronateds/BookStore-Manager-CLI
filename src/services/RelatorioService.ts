import { ILivrosPorAutor } from "../models/Autor";
import { IEmprestimo, IEmprestimosPorLivro } from "../models/Emprestimo";
import { ILivro } from "../models/Livro";
import { RelatorioRepository } from "../repositories/RelatorioRepository";

export class RelatorioService {
    private relatorioRepository = new RelatorioRepository();

    async livrosDisponiveis(): Promise<ILivro[] | undefined>{
        return await this.relatorioRepository.livrosDisponiveis();
    }

    async livrosEmprestados(): Promise<IEmprestimo[] | undefined> {
        return await this.relatorioRepository.livrosEmprestados();
    }

    async livrosPorAutor(): Promise<ILivrosPorAutor[]> {
        return await this.relatorioRepository.livrosPorAutor();
    }

    async emprestimosPorLivro(): Promise<IEmprestimosPorLivro[]> {
        return await this.relatorioRepository.emprestimosPorLivro();
    }
}