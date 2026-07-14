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

}

