import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { ILivro, ILivroComAutor, Livro } from '../models/Livro';
import { AppError } from '../utils/AppError';
import { isAnoValido, isInteiroNaoNegativo, isTextoValido } from '../utils/validators';

export class LivroService {
  private livroRepository = new LivroRepository();
  private autorRepository = new AutorRepository();

  async cadastrar(dados: ILivro): Promise<Livro> {
    if (!isTextoValido(dados.titulo)) {
      throw new AppError('Título do livro inválido. Informe pelo menos 2 caracteres.');
    }
    if (!isAnoValido(dados.anoPublicacao)) {
      throw new AppError('Ano de publicação inválido.');
    }
    if (!isInteiroNaoNegativo(dados.quantidadeTotal)) {
      throw new AppError('Quantidade total inválida.');
    }

    const autor = await this.autorRepository.buscarPorId(dados.autorId);
    if (!autor) {
      throw new AppError(`Autor com id ${dados.autorId} não encontrado. Cadastre o autor antes do livro.`);
    }

    const livroParaCriar: ILivro = {
      ...dados,
      quantidadeDisponivel: dados.quantidadeTotal,
    };

    return this.livroRepository.criar(livroParaCriar);
 }
  
  async listar(): Promise<ILivroComAutor[]> {
    return this.livroRepository.listarTodos();
 }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new AppError(`Livro com id ${id} não encontrado.`);
    }
    return livro;
  }

  async atualizar(id: number, dados: ILivro): Promise<Livro> {
    const livroExistente = await this.buscarPorId(id);

    if (!isTextoValido(dados.titulo)) {
      throw new AppError('Título do livro inválido.');
    }
    if (!isAnoValido(dados.anoPublicacao)) {
      throw new AppError('Ano de publicação inválido.');
    }

    const autor = await this.autorRepository.buscarPorId(dados.autorId);
    if (!autor) {
      throw new AppError(`Autor com id ${dados.autorId} não encontrado.`);
    }

    
    const quantidadeEmprestada = livroExistente.quantidadeTotal - livroExistente.quantidadeDisponivel;
    const novaQuantidadeDisponivel = dados.quantidadeTotal - quantidadeEmprestada;

    if (novaQuantidadeDisponivel < 0) {
      throw new AppError(
        `Não é possível reduzir a quantidade total abaixo de ${quantidadeEmprestada} (livros atualmente emprestados).`,
      );
    }

    const atualizado = await this.livroRepository.atualizar(id, {
      ...dados,
      quantidadeDisponivel: novaQuantidadeDisponivel,
    });

    if (!atualizado) {
      throw new AppError('Não foi possível atualizar o livro.');
    }
    return atualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    const possuiEmprestimos = await this.livroRepository.possuiEmprestimosVinculados(id);
    if (possuiEmprestimos) {
      throw new AppError('Não é possível remover o livro: existem empréstimos vinculados a ele.');
    }
    await this.livroRepository.remover(id);
  }
  
}

