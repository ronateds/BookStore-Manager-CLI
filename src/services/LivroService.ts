import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { ILivro } from '../models/Livro';
import { AppError } from '../utils/AppError';
import { isAnoValido, isInteiroNaoNegativo, isTituloValido } from '../utils/validators';

export class LivroService {
  private livroRepository = new LivroRepository();
  private autorRepository = new AutorRepository();

  async listar(): Promise<ILivro[]> {
    return await this.livroRepository.listarTodos();
  }

  async cadastrar(dados: Omit<ILivro, "id">): Promise<ILivro | undefined> {
    const validacaoTitulo = isTituloValido(dados.titulo);
    if (!validacaoTitulo.ok) {
      throw new AppError(validacaoTitulo.msg);
    }

    const validacaoAno = isAnoValido(dados.ano_publicacao);
    if (!validacaoAno.ok) {
      throw new AppError(validacaoAno.msg);
    }

    const validacaoQuantidade = isInteiroNaoNegativo(dados.quantidade_total)
    if (!validacaoQuantidade.ok) {
      throw new AppError(validacaoQuantidade.msg);
    }

    const autor = await this.autorRepository.buscarPorId(dados.autor_id);
    if (!autor) {
      throw new AppError(`Autor com id ${ dados.autor_id } não encontrado. Cadastre o autor antes do livro.`);
    }

    const livroParaCriar: Omit<ILivro, "id"> = {
      ...dados,
      quantidade_disponivel: dados.quantidade_total,
    };

    return this.livroRepository.criar(livroParaCriar);
  }

  async buscarPorId(id: number): Promise<ILivro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new AppError(`Livro com id ${ id } não encontrado.`);
    }
    return livro;
  }

  async atualizar(id: number, dados: ILivro): Promise<ILivro> {
    const validacaoTitulo = isTituloValido(dados.titulo);
    if (!validacaoTitulo.ok) {
      throw new AppError(validacaoTitulo.msg);
    }

    const validacaoAno = isAnoValido(dados.ano_publicacao);
    if (!validacaoAno.ok) {
      throw new AppError(validacaoAno.msg);
    }

    const validacaoQuantidade = isInteiroNaoNegativo(dados.quantidade_total)
    if (!validacaoQuantidade.ok) {
      throw new AppError(validacaoQuantidade.msg);
    }

    if (dados.quantidade_disponivel < 0) {
      throw new AppError('Não é possível reduzir a quantidade disponível abaixo de 0.');
    }


    if (dados.quantidade_total < dados.quantidade_disponivel) {
      throw new AppError('Numero de livros total precisa ser igual ou maior que livros disponíveis.');
    }

    const atualizado = await this.livroRepository.atualizar(id, dados);

    if (!atualizado) {
      throw new AppError('Não foi possível atualizar o livro.');
    }
    return atualizado;
  }

  async remover(id: number): Promise<void> {
    await this.livroRepository.remover(id);
  }
}