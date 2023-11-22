export class Cnia {

    constructor() {
        this.id = undefined;
        this.coddoc = undefined;
        this.codpess = undefined;
        this.descrpess = undefined;
        this.dthroper = undefined;
        this.mensagem = undefined;
        this.numproc = undefined;
    }

    id: number | undefined;
    coddoc: number | undefined;
    codpess: number | undefined; // codpessoal
    descrpess: string | undefined;
    dthroper: string | undefined; //Data da operação
    mensagem: string | undefined;
    numproc: string | undefined; //Número do Processo

}