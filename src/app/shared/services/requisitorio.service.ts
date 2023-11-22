import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";

@Injectable()
export class ConsultaRequisitorioService {
    constructor(http: HttpClient) { }
    getRequisitorio(filters: any[]): ResponsePagination {
        console.log('filters',filters)
        let res = new ResponsePagination();
        res.content = new Array<ResponseConsultaReq>(10).fill(CONSULTAPROCESSO_MOCK)
        return res
    }

    getDetalheRequisitorio(numreq: string):any{
        return {}
    }
    getOficoRequisitorio(numreq: string):any{
        return {}
    }
}
export const CONSULTAPROCESSO_MOCK: ResponseConsultaReq = {
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

    , movimentos: [
        {

            datamov: new Date('2021-02-02T21:18:00')
            ,codfase: 999
            ,descfase: 'O requisitório foi entregue ao ESPARTA e aguarda início da autuação.'
            ,beneficiario: undefined
            ,banco: undefined
            ,agencia: undefined
            ,conta: undefined
            ,datadeposito:undefined

        }
        , {
            datamov: new Date('2021-02-03T14:09:00')
            , codfase: 888
            , descfase: 'Requisitório autuado com sucesso. Número do processo no ASC: 0217594-32.2021.4.05.0000'
            , beneficiario: undefined
            , banco: undefined
            , agencia: undefined
            , conta: undefined
            , datadeposito: undefined
        }
        , {
            datamov: new Date('2022-03-09T16:46:27')
            , codfase: 1688
            , descfase: 'Processo Incluído em Proposta Orçamentária'
            , beneficiario: undefined
            , banco: undefined
            , agencia: undefined
            , conta: undefined
            , datadeposito: undefined
        }

    ]
}

export type ResponseConsultaReq = {
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
    movimentos:ResponseConsultaReqMov[]
}

export type ResponseConsultaReqMov = {
    datamov: Date
    codfase: number
    descfase: string
    beneficiario?: string
    banco?: string
    agencia?: string
    conta?: string
    datadeposito?:Date
}
