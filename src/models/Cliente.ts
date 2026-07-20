export interface ICliente {
    id: number;
    nome: string;
    email: string;
}

export class Cliente implements ICliente {
    id: number;
    nome: string;
    email: string;

    constructor(id: number, nome: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}