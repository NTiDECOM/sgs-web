import { Pessoa } from "./pessoa";

export class Socio {

    metodoContribuicao: string;
    valorContribuicao: string;
    dataAdesao: Date;
    vencimentoContribuicao: string;
    telefone: string;
    modalidadeAssociacao: string;
    categoriaAssociacao: string;
    pessoa: Pessoa;
    constructor() {
        this.pessoa = new Pessoa();
    }
}