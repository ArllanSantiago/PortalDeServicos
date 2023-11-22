import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { ConsultaProcesso } from "../model/consulta-processo";
import { ConsultaProcessoMov } from "../model/consulta-processo-mov";
import { ConsultaProcessoParte } from "../model/consulta-processo-parte";

@Injectable()
export class AtenasService {
    constructor(http: HttpClient) { }


    getProcesso(filters: any[]): ResponsePagination {
        console.log('filters', filters)
        let res = new ResponsePagination();
        res.content = new Array<ConsultaProcesso>(10).fill(CONSULTAPROCESSO_MOCK)
        return res
    }
    getProcessoByParte(filters: any[]): ResponsePagination {
        console.log('filters', filters)
        let res = new ResponsePagination();
        res.content = new Array<ConsultaProcesso>(10).fill(CONSULTAPROCESSO_MOCK)
        return res
    }
    getProcessoByEntidade(filters: any[]): ResponsePagination {
        console.log('filters', filters)
        let res = new ResponsePagination();
        res.content = new Array<ConsultaProcesso>(10).fill(CONSULTAPROCESSO_MOCK)
        return res
    }

    getDetalheProcesso(numproc: string): { partes: ConsultaProcessoParte[], movimentos: ConsultaProcessoMov[] } {
        return { partes: CONSULTAPROCESSO_MOCK.partes, movimentos: CONSULTAPROCESSO_MOCK.movimentos }
    }
}
export const CONSULTAPROCESSO_MOCK: ConsultaProcesso = {
    seqclasse: 'RPV2877884-PE (@)'
    , numprocform: '0233514-12.2022.4.05.0000'
    , codTipoProc: 399
    , descrtipoproc: 'RPV-REQUISIÇÃO DE PEQUENO VALOR'
    , descrassuntocnj: 'SEM ASSUNTO'
    , codsecao: 83
    , descrlocalatual: 'Divisão de Precatório'
    , dataprotocolo: new Date('2022-02-17T07:06:07')
    , dataautuacao: new Date('2022-02-17T10:17:34')
    , datadistribuição: new Date('2022-02-17T10:41:49')
    , nomemagistrado: 'Relator DESEMBARGADOR(A) FEDERAL PRESIDENTE ARLLAN FELIPE'
    , partes: [
        { descrTipoParte: 'Autor', numdocpess: '24800112400', nomeparte: 'CELIA LOPES TAVARES', personalidade: 'NAO SEI', caracteristica: 'NÃO SEI' }
        , { descrTipoParte: 'Réu', numdocpess: '00394460021653', nomeparte: 'UNIÃO', personalidade: 'NAO SEI', caracteristica: 'NÃO SEI' }
        , { descrTipoParte: 'Deprecante', numdocpess: '00375114000116', nomeparte: 'JUÍZO DA 2ª VARA FEDERAL DE PERNAMBUCO (RECIFE)', personalidade: 'NAO SEI', caracteristica: 'NÃO SEI' }
        , { descrTipoParte: 'Réu', numdocpess: '00394460021653', nomeparte: 'UNIÃO', personalidade: 'NAO SEI', caracteristica: 'NÃO SEI' }
        , { descrTipoParte: 'Deprecante', numdocpess: '00375114000116', nomeparte: 'JUÍZO DA 2ª VARA FEDERAL DE PERNAMBUCO (RECIFE)', personalidade: 'NAO SEI', caracteristica: 'NÃO SEI' }
        , { descrTipoParte: 'Deprecante', numdocpess: '00375114000116', nomeparte: 'JUÍZO DA 2ª VARA FEDERAL DE PERNAMBUCO (RECIFE)', personalidade: 'NAO SEI', caracteristica: 'NÃO SEI' }
    ]
    , movimentos: [
        {
            datamov: new Date('2022-03-23T09:37:00')
            , codfase: 594
            , descfase: 'Depósito efetivado'
            , complemento1: '9999-DESCRICAO DO COMPL1 AUSENTE'
            , complemento2: '916-CAIXA ECONOMICA FEDERAL - Antecipação do pagamento - Os valores estarão disponíveis para saque a partir do dia 30 deste mês'
            , observacao: 'Parcela 1 PAGAMENTO DAS RPVS AUTUADAS EM FEVEREIRO DE 2022. 2022OB800037 PAGAMENTO DAS RPVS AUTUADAS EM FEVEREIRO DE 2022. 2022OB800029 A 2022OB000039.'
        }
        , {
            datamov: new Date('2022-03-18T10:12:00')
            , codfase: 592
            , descfase: 'Pagamento em processamento'
            , complemento1: '9999-DESCRICAO DO COMPL1 AUSENTE'
            , complemento2: '293- RPV'
            , observacao: 'Parcela 1'
        }
        , {
            datamov: new Date('2022-03-09T16:46:27')
            , codfase: 1688
            , descfase: 'Processo Incluído em Proposta Orçamentária'
            , complemento1: '482-RPV'
            , complemento2: '9999-DESCRICAO DO COMPL2 AUSENTE'
            , observacao: 'Processo (0233514-12.2022.4.05.0000) incluidos em proposta orçamentária referente ao mês/ano (02/2022) de autuação.'
        }

    ]
}