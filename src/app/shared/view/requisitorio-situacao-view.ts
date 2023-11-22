import { jsPDF } from "jspdf";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { Filters } from "src/app/shared/component/filters/filters";
import { RequestSearchByAcaoExec, RequestSearchByAcaoOrig, RequestSearchByDocum, RequestSearchByNumProc, RequestSearchByNumReq, RequestSearchByNumSeq, RequestSearchByVara} from 'src/app/shared/functions/search-basic-request.model'
import { RequestSearchByAny } from "src/app/shared/model/request.interface";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { SearchViewBasic } from "src/app/shared/view/search-basic-view.model";
import { FormControl, Validators } from "@angular/forms";
import { HeaderGridReqSituacao } from "src/app/shared/enum/header-grid-req-situacao.enum";

export class RequisitorioSituacaoView extends SearchViewBasic {
    constructor(showDetail:(e: any) => void) {
        super(
            undefined
            ,undefined
            ,undefined
            ,<GridBasic>{
                columns: [
                    { headerName: HeaderGridReqSituacao.numreq, field: "numreq", resizable: true, sortable: true, width: 180, filter: true , hide: false}
                    ,{ headerName: HeaderGridReqSituacao.dtreceb, field: "dtreceb", resizable: true, sortable: true, width: 180, filter: true }
                    ,{ headerName: HeaderGridReqSituacao.indautuado, field: "indautuado", resizable: true, sortable: true, width: 180, filter: true }
                    ,{ headerName: HeaderGridReqSituacao.mov, field: "mov", resizable: true, sortable: true, width: 600, filter: true }
                    ,{ headerName: HeaderGridReqSituacao.detailplus, field: 'btn', width: 60, sortable: true, filter: false, headerCheckboxSelection: false, checkboxSelection: false
                    , cellRenderer: 'buttonRenderer'
                    , cellRendererParams: {
                      onClick: showDetail
                      , label: undefined
                    }}
                ]
                , data: new ResponsePagination()               
            }  
            ,[]          
        )
        this.title = "Situação do Requisitório"
        this.subTitle = "Consultar atual situação do requisitório"
        this.breadcrumbs = [...this.breadcrumbs, { title: this.title }]
        this.pdf = new jsPDF()    
    }   
    pdf: jsPDF 
    controls: { [key: string]: FormControl } = {
        secao: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , numProc: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , nomeBenef: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , nomeExato: new FormControl(false, { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , numOab: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })
        , numDocBenef: new FormControl('', { initialValueIsDefault: true, updateOn: 'blur', validators: [] })

    }
}

export class RequisitorioSituacaoFilter extends Filters {
    constructor() {
        super();
    }
}

export class RequestReqSituacaoByDocum extends RequestSearchByDocum {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)        
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
                    , dtDepositoFin : ctrls['dataFin'].value  }
    }   

}
export class RequestReqSituacaoByNumSeq extends RequestSearchByNumSeq {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls) 
    }
}
export class RequestReqSituacaoByAcaoOrig extends RequestSearchByAcaoOrig {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
                    , dtDepositoFin : ctrls['dataFin'].value  }
    }   
}
export class RequestReqSituacaoByNumProc extends RequestSearchByNumProc {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls) 
    }
}
export class RequestReqSituacaoByNumReq extends RequestSearchByNumReq {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls)
    }
}
export class RequestReqSituacaoByVara extends RequestSearchByVara {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
                    , dtDepositoFin : ctrls['dataFin'].value  }
    }      
}
export class RequestReqSituacaoByAcaoExec extends RequestSearchByAcaoExec {
    constructor(ctrls: { [key: string]: FormControl }) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
                    , dtDepositoFin : ctrls['dataFin'].value  }
    }      
}

//Criar O Objeto de Requisição de acordo com a opção de consulta selecionada.
export function getRequestSearch(op: string, ctrls: { [key: string]: FormControl }): RequestSearchByAny {
    const obj: { [key: string]: RequestSearchByAny } = {
        '0': new RequestReqSituacaoByDocum(ctrls)
        , '1': new RequestReqSituacaoByNumSeq(ctrls)
        , '2': new RequestReqSituacaoByAcaoOrig(ctrls)
        , '3': new RequestReqSituacaoByNumProc(ctrls)
        , '4': new RequestReqSituacaoByNumReq(ctrls)
        , '5': new RequestReqSituacaoByVara(ctrls)
        , '6': new RequestReqSituacaoByAcaoExec(ctrls)
    }
    return obj[op];
}
