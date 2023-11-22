
import { jsPDF } from "jspdf"
import { FormControl, Validators } from "@angular/forms"
import { SearchViewBasic } from "src/app/shared/view/search-basic-view.model"
import { RequestSearchByAcaoExec, RequestSearchByAcaoOrig, RequestSearchByDocum, RequestSearchByNumProc, RequestSearchByNumReq, RequestSearchByNumSeq, RequestSearchByVara } from "src/app/shared/functions/search-basic-request.model"
import { RequestSearchByAny } from "src/app/shared/model/request.interface"
import { Ordenacao } from "src/app/shared/component/filters/ordenacao/ordenacao"

export class ContasView extends SearchViewBasic {
    constructor() {
        super()
        this.pdf = new jsPDF()
        this.lsOrdem = lsOrdemBasic();
    }
    pdf: jsPDF
    controls: { [key: string]: FormControl } = {
        documento: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , codTipoProc: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , ordenacao: new FormControl('beneficiario', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , numSeqIni: new FormControl(false, { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , numSeqFin: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , acaoOriginaria: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , numProcesso: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , numRequisitorio: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , codVara: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , codUf: new FormControl('PE', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , acaoExecutoria: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , dataIni: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , dataFin: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
    }

}
function lsOrdemBasic():Ordenacao[]{
    return [
        { descricao: "Nome", valor: 'beneficiario' }
        , { descricao: "Processo", valor: 'numProcNoTrf5' }
        , { descricao: "Data", valor: 'dataDeDeposito' }
    ]
  }
export function getRequestContas(op: string, ctrls: { [key: string]: FormControl }): RequestSearchByAny {
    const obj: { [key: string]: RequestSearchByAny } = {
        '0': new RequestContasByDocum(ctrls)
        , '1': new RequestContasByNumSeq(ctrls)
        , '2': new RequestContasByAcaoOrig(ctrls)
        , '3': new RequestContasByNumProc(ctrls)
        , '4': new RequestContasByNumReq(ctrls)
        , '5': new RequestContasByVara(ctrls)
        , '6': new RequestContasByAcaoExec(ctrls)
    }
    return obj[op];
}

export class RequestContasByDocum extends RequestSearchByDocum {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
        this.data = {
            ...this.data
            , dtDepositoIni: ctrls['dataIni'].value
            , dtDepositoFin: ctrls['dataFin'].value
        }
    }
    dtDepositoIni?: Date;
    dtDepositoFin?: Date;
}
export class RequestContasByNumSeq extends RequestSearchByNumSeq {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
    }
}
export class RequestContasByAcaoOrig extends RequestSearchByAcaoOrig {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
        this.data = {
            ...this.data
            , dtDepositoIni: ctrls['dataIni'].value
            , dtDepositoFin: ctrls['dataFin'].value
        }
    }
}
export class RequestContasByNumProc extends RequestSearchByNumProc {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
    }
}
export class RequestContasByNumReq extends RequestSearchByNumReq {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
    }
}
export class RequestContasByVara extends RequestSearchByVara {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
        this.data = {
            ...this.data
            , dtDepositoIni: ctrls['dataIni'].value
            , dtDepositoFin: ctrls['dataFin'].value
        }
    }
}
export class RequestContasByAcaoExec extends RequestSearchByAcaoExec {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
        this.data = {
            ...this.data
            , dtDepositoIni: ctrls['dataIni'].value
            , dtDepositoFin: ctrls['dataFin'].value
        }
    }
}