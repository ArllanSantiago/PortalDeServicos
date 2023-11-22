import { ConsultaProcessoMov } from "./consulta-processo-mov";
import { ConsultaProcessoParte } from "./consulta-processo-parte";

export type ConsultaProcesso = {
    seqclasse: string
    numprocform: string
    codTipoProc: number
    descrtipoproc: string
    descrassuntocnj: string
    codsecao: number
    descrlocalatual: string
    dataprotocolo: Date
    dataautuacao: Date
    datadistribuição: Date
    nomemagistrado: string
    partes: ConsultaProcessoParte[]
    movimentos: ConsultaProcessoMov[]

}
