import { LivroService } from '../services/LivroService';
import { AppError } from '../utils/AppError';
import { tratarErro } from '../utils/tratarErro';
import { input } from '@inquirer/i18n';

export class LivroController {
  private livroService = new LivroService();

async cadastrar(): Promise<void> {
    try {
      const tituloLivro = await input({ message: 'Título do livro: ' });
      const anoPublicacao = Number(await input({ message: 'Ano de publicação: ' }));
      const quantidadeTotal = Number(await input({ message: 'Quantidade total de exemplares: ' }));
      const autorId = Number(await input({ message: 'Id do autor: ' }));

      const livro = await this.livroService.cadastrar({
        id: 0,
        titulo: tituloLivro,
        anoPublicacao,
        quantidadeTotal,
        quantidadeDisponivel: quantidadeTotal,
        autorId,
      });

      console.log(`\nLivro cadastrado com sucesso! (id: ${ livro.id })\n`);
    } catch (error) {
      tratarErro(error);
    }
  }
  
  async listar(): Promise<void> {
    try {
      const livros = await this.livroService.listar();
      if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
        return;
      }

      livros.forEach((livro) => {
              console.log(
          `[${ livro.id }] ${ livro.titulo } (${ livro.anoPublicacao }) - Autor: ${ livro.nomeAutor } - Disponíveis: ${ livro.quantidadeDisponivel }/${ livro.quantidadeTotal }`,
        );
      });
      console.log();
    } catch (error) {
      tratarErro(error);
    }
  } 

    async consultarPorId(): Promise<void> {
    try {
      const id = Number(await input({ message: 'Informe o id do livro: ' }));
      const livro = await this.livroService.buscarPorId(id);

      console.log(
        `\n[${ livro.id }] ${ livro.titulo } (${ livro.anoPublicacao }) - Disponíveis: ${ livro.quantidadeDisponivel }/${ livro.quantidadeTotal }\n`);
    } catch (error) {
      tratarErro(error);
    }
  }

}