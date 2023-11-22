import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable()
export class ProcessoService {
    constructor(private http: HttpClient) { }

    searchBy(by: SeachrByProcess, filters: { [key: string]: AbstractControl }): Observable<any> {
        switch (by) {
            case 'numProcesso':
                return this.getDetalheProcesso(filters['numProcesso'].value, filters['secao'].value);
            case 'DocParte':
                return this.getProcessoByNumDocParte(filters['numDocBenef'].value, filters['secao'].value);
            case 'Oab':
                return this.getProcessoByNumOab(filters['numOab'].value, filters['secao'].value);
            case 'NomeParte':
                return this.getProcessoByNomeParte(filters['nomeBenef'].value, filters['secao'].value, filters['nomeExato'].value);
            default:
                return this.getDetalheProcesso(filters['numProcesso'].value, filters['secao'].value);
        }
    }

    getProcessoByNumDocParte(numDocParte: string, secao:string): Observable<any> {
        return this.http.get(`http://intercomunicacaoapi-eagle-hml.apps.ocp.trf5.gov.br/CpfouCnpj/${numDocParte}/${secao}`)
    }
    getProcessoByNumOab(numOab: string, secao:string):  Observable<any> {
        return this.http.get(`http://intercomunicacaoapi-eagle-hml.apps.ocp.trf5.gov.br/NumeroOAB/${numOab}/${secao}`)
    }
    getProcessoByNomeParte(NomeParte: string , secao: string, nomeExtato:boolean = false):  Observable<any> {
        return this.http.get(`http://intercomunicacaoapi-eagle-hml.apps.ocp.trf5.gov.br/NomeDaParte/${NomeParte}/${secao}/${nomeExtato}`)
    }
    getDetalheProcesso(numproc: string, secao: string): Observable<any> {
        return this.http.get(`http://intercomunicacaoapi-eagle-hml.apps.ocp.trf5.gov.br/processo/${secao !== 'TR' ? secao : "esparta"}/${numproc}`)
    }
    getDetalheMovimento(numproc: string, secao: string): Observable<any> {
        return this.http.get(`http://intercomunicacaoapi-eagle-hml.apps.ocp.trf5.gov.br/movimento/${secao !== 'TR' ? secao + '/' : ""}{numProcesso}?numeroProcesso=${numproc}`)
    }
}





export const CONSULTAPROCESSO_MOCK: ResponseConsultaProc = {
    seqclasse: 'RPV2877884-PE (@)'
    , numprocform: '02335141220224050000'
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
export type ResponseConsultaProc = {
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
    partes: ResponseConsultaProcParte[]
    movimentos: ResponseConsultaProcMov[]

}

export type ResponseConsultaProcParte = {
    descrTipoParte: string
    oab?: string
    numdocpess?: string
    nomeparte: string
    personalidade: any
    caracteristica: any

}

export type ResponseConsultaProcMov = {
    datamov: Date
    codfase: number
    descfase: string
    complemento1: string
    complemento2: string
    observacao: string
}

export type SeachrByProcess = 'numProcesso' | 'DocParte' | 'Oab' | 'NomeParte'