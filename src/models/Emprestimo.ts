export interface IEmprestimo {
    id: number;
    cliente_id: number;
    livro_id: number;
    data_emprestimo?: Date;
    data_devolucao?: Date | null;
}

export interface IEmprestimoDetalhado extends IEmprestimo {
    titulo_livro: string;
    nome_cliente: string;
}

export class Emprestimo implements IEmprestimo {
    id: number;
    cliente_id: number;
    livro_id: number;
    data_emprestimo?: Date;
    data_devolucao?: Date | null;

    constructor(
        id: number,
        cliente_id: number,
        livro_id: number,
        data_emprestimo: Date,
        data_devolucao: Date | null,
    ) {
        this.id = id;
        this.livro_id = livro_id;
        this.cliente_id = cliente_id;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
    }
}
