import { FormControl } from "@angular/forms"
import { TipoProc } from "../enum/processo.enum"
import { RequestSearchByAny } from "../model/request.interface"

export class RequestSearchByDocum implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        console.log(ctrls['documento'].value,"aquii")
        this.valid = !!ctrls['documento'].value
        this.data = {
            documento: ctrls['documento'].value
            , classeReq: TipoProc[ ctrls['codTipoProc'].value as number || 0]

        }
        this.msg = 'Documento é um campo obrigatório'
        this.urlParams = {
            sort: ctrls['ordenacao'].value
            , page: 0
        }
    }
    data:Object
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}
export class RequestSearchByNumSeq implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        this.valid = !!ctrls['documento'].value
            && !!ctrls['numSeqIni'].value
            && !!ctrls['numSeqFin'].value
        this.data = {
            documento: ctrls['documento'].value
            , numSeqIni: ctrls['numSeqIni'].value!
            , numSeqFin: ctrls['numSeqFin'].value!
            , classeReq: TipoProc[ctrls['codTipoProc'].value!]
        }
        this.msg = 'Intervalo Sequencial não definido'
        this.urlParams = {
            sort: ctrls['ordenacao'].value.ordenacao!
            , page: 0
        }
    }
    data: {
        documento?: string
        , numSeqIni: number
        , numSeqFin: number
        , classeReq: string
    }
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}
export class RequestSearchByAcaoOrig implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        this.valid = !!ctrls['documento'].value
            && !!ctrls['acaoOriginaria'].value
        this.data = {
            documento: ctrls['documento'].value
            , acaoOriginaria: ctrls['acaoOriginaria'].value
            , classeReq: TipoProc[ctrls['codTipoProc'].value!]
        }
        this.msg = 'Documento e Ação Originária são campos obrigatórios'
        this.urlParams = {
            sort: ctrls['ordenacao'].value!
            , page: 0
        }
    }
    data:Object
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}
export class RequestSearchByNumProc implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        this.valid = !!ctrls['documento'].value
            && !!ctrls['numProcesso'].value
        this.data = {
            documento: ctrls['documento'].value
            , numProcNoASC: ctrls['numProcesso'].value
            , classeReq: TipoProc[ctrls['codTipoProc'].value!]
        }
        this.msg = "Documento e Núm do Processo são campos obrigatórios"
        this.urlParams = {
            sort: ctrls['ordenacao'].value.ordenacao!
            , page: 0
        }
    }
    data: {
        documento?: string
        , numProcNoASC: string
        , classeReq: string
    }
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}
export class RequestSearchByNumReq implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        this.valid = !!ctrls['documento'].value
            && !!ctrls['numRequisitorio'].value
        this.data = {
            documento: ctrls['documento'].value
            , numeroRequisitorio: ctrls['numRequisitorio'].value!
            , classeReq: TipoProc[ctrls['codTipoProc'].value!]
        }
        this.msg = "Documento e Núm do Requisitório são campos obrigatórios"
        this.urlParams = {
            sort: ctrls['ordenacao'].value.ordenacao!
            , page: 0
        }
    }
    data: {
        documento?: string
        , numeroRequisitorio: string
        , classeReq: string
    }
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}
export class RequestSearchByVara implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        this.valid = !!ctrls['documento'].value.documento
        && !!ctrls['codUf'].value.codUf

        this.data = {
            documento: ctrls['documento'].value
            , vara: ctrls['codVara'].value
            , secao: ctrls['codUf'].value
            , classeReq: TipoProc[ctrls['codTipoProc'].value!]
        }
        this.msg = "Documento e uf são campos obrigatórios"
        this.urlParams = {
            sort: ctrls['ordenacao'].value.ordenacao!
            , page: 0
        }
    }
    data:Object
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}
export class RequestSearchByAcaoExec implements RequestSearchByAny {
    constructor(ctrls: { [key: string]: FormControl }) {
        this.valid = !!ctrls['documento'].value
        && !!ctrls['acaoExecutoria'].value
        this.data = {
            documento: ctrls['documento'].value
            , acaoExecutoria: ctrls['acaoExecutoria'].value
            , classeReq: TipoProc[ctrls['codTipoProc'].value!]
        }
        this.msg = 'Documento e Ação Executoria são campos obrigatórios'
        this.urlParams = {
            sort: ctrls['ordenacao'].value!
            , page: 0
        }
    }
    data: Object
    valid: boolean
    msg: string
    urlParams: { sort: string; page: number; };
}

export function getRequestSearch(op: string, ctrls:  { [key: string]: FormControl}): RequestSearchByAny {
    const obj: { [key: string]: RequestSearchByAny } = {
        '0': new RequestSearchByDocum(ctrls)
        , '1': new RequestSearchByNumSeq(ctrls)
        , '2': new RequestSearchByAcaoOrig(ctrls)
        , '3': new RequestSearchByNumProc(ctrls)
        , '4': new RequestSearchByNumReq(ctrls)
        , '5': new RequestSearchByVara(ctrls)
        , '6': new RequestSearchByAcaoExec(ctrls)
    }
    return obj[op];
}
