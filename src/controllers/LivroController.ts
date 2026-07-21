import { ILivro } from '../models/Livro';
import { LivroService } from '../services/LivroService';
import { AppError } from '../utils/AppError';
import { listarLivro, listarTodosLivros } from '../utils/formatters';
import { tratarErro } from '../utils/tratarErro';
import { isAnoValido, isInteiroNaoNegativo, isTituloValido } from '../utils/validators';
import { input } from '@inquirer/i18n';

export class LivroController {
  private livroService = new LivroService();

  async listar(): Promise<void> {
    try {
      const livros: ILivro[] = await this.livroService.listar();

      livros.length ?
        listarTodosLivros(livros) :
        console.log('Nenhum livro cadastrado.\n');

      return;
    } catch (error) {
      tratarErro(error);
      return;
    }
  }

  async cadastrar(): Promise<void> {
    try {
      const tituloLivro = await input({ message: 'Título do livro: ' });
      const validacaoTitulo = isTituloValido(tituloLivro);
      if (!validacaoTitulo.ok) throw new AppError(validacaoTitulo.msg);

      const ano_publicacao = Number(await input({ message: 'Ano de publicação: ' }));
      const validacaoAno = isAnoValido(ano_publicacao);
      if (!validacaoAno.ok) throw new AppError(validacaoAno.msg);

      const quantidade_total = Number(await input({ message: 'Quantidade total de exemplares: ' }));
      const validacaoQuantidade = isInteiroNaoNegativo(quantidade_total);
      if (!validacaoQuantidade.ok) throw new AppError(validacaoQuantidade.msg);

      const autor_id = Number(await input({ message: 'Id do autor: ' }));

      const livro: ILivro | undefined = await this.livroService.cadastrar({
        titulo: tituloLivro,
        ano_publicacao,
        quantidade_total,
        quantidade_disponivel: quantidade_total,
        autor_id,
      });

      if (!livro) throw new AppError('Erro ao cadastrar livro');

      console.log(`\nLivro cadastrado com sucesso! (id: ${ livro.id })\n`);
    } catch (error) {
      tratarErro(error);
    }
  }

  async buscarPorId(): Promise<void> {
    try {
      const id = Number(await input({ message: 'Informe o id do livro: ' }));
      const livro = await this.livroService.buscarPorId(id);

      console.log();
      listarLivro(livro);
      console.log();
    } catch (error) {
      tratarErro(error);
    }
  }

  async atualizar(): Promise<void> {
    try {
      // Procura livro por id primeiro
      const id = Number(await input({ message: 'Informe o id do livro: ' }));
      const livro = await this.livroService.buscarPorId(id);
      if(!livro) throw new AppError(`Não foi encontrado livro com id: ${id}`);

      // Pede inputs ao usuario definindo como padrão os atributos do livro existente
      const tituloLivro = await input({ message: 'Título do livro: ', default: livro.titulo });
      const validacaoTitulo = isTituloValido(tituloLivro);
      if (!validacaoTitulo.ok) throw new AppError(validacaoTitulo.msg);

      const ano_publicacao = Number(await input({ message: 'Ano de publicação: ', default: String(livro.ano_publicacao) }));
      const validacaoAno = isAnoValido(ano_publicacao);
      if (!validacaoAno.ok) throw new AppError(validacaoAno.msg);

      const quantidade_disponivel = Number(await input({ message: 'Quantidade disponível de exemplares: ', default: String(livro.quantidade_disponivel) }));
      const validacaoQuantidadeDisp = isInteiroNaoNegativo(quantidade_disponivel);
      if (!validacaoQuantidadeDisp.ok) throw new AppError(validacaoQuantidadeDisp.msg);

      const quantidade_total = Number(await input({ message: 'Quantidade total de exemplares: ', default: String(livro.quantidade_total) }));
      const validacaoQuantidade = isInteiroNaoNegativo(quantidade_total);
      if (!validacaoQuantidade.ok) throw new AppError(validacaoQuantidade.msg);

      const autor_id = Number(await input({ message: 'Id do autor: ', default: String(livro.autor_id) }));

      // Atualiza o livro
      const livroAtualizado = await this.livroService.atualizar(id, {
        id: id,
        titulo: tituloLivro,
        ano_publicacao,
        quantidade_total,
        quantidade_disponivel,
        autor_id,
      });

      if(!livroAtualizado) throw new AppError('Livro não foi atualizado.')

      console.log(`\nLivro atualizado com sucesso!\n`);
      listarLivro(livroAtualizado);
      console.log();
    } catch (error) {
      tratarErro(error);
    }
  }

  async remover(): Promise<void> {
    try {
      const id = Number(await input({ message: 'Informe o id do livro: ' }));
      await this.livroService.remover(id);
      console.log('\nLivro removido com sucesso!\n');
    } catch (error) {
      tratarErro(error);
    }
  }
}