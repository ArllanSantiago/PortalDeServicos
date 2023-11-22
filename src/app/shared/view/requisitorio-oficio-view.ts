import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { Filters} from "src/app/shared/component/filters/filters";
import { RequestSearchByAcaoExec, RequestSearchByAcaoOrig, RequestSearchByDocum, RequestSearchByNumProc, RequestSearchByNumReq, RequestSearchByNumSeq, RequestSearchByVara } from 'src/app/shared/functions/search-basic-request.model'
import { RequestSearchByAny } from "src/app/shared/model/request.interface";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { SearchViewBasic } from "src/app/shared/view/search-basic-view.model";
import { FormControl, Validators } from "@angular/forms";
import { HeaderGridReqOficio } from "src/app/shared/enum/header-grid-req-oficio.enum";


export class RequisitorioOficioView extends SearchViewBasic {
    constructor(showDetail:any) {
        super(
            undefined
            ,undefined
            ,undefined
            ,<GridBasic>{
                columns: [
                    { headerName: HeaderGridReqOficio.numreq, field: "numreq", resizable: true, sortable: true, width: 180, filter: true }
                    ,{ headerName: HeaderGridReqOficio.dtmov, field: "dataDeMovimento", resizable: true, sortable: true, width: 180, filter: true }
                    ,{ headerName: HeaderGridReqOficio.msg, field: "mensagemUltimoMovimento", resizable: true, sortable: true, width: 180, filter: true }
                    ,{ headerName: HeaderGridReqOficio.btn, field: 'btn', width: 60, sortable: true, filter: false, headerCheckboxSelection: false, checkboxSelection: false
                    , cellRenderer: 'buttonRenderer'
                    , cellRendererParams: {
                      onClick: showDetail
                      , label: undefined
                      , classIcon: "zmdi zmdi-download zmdi-hc-1x"
                    }}
                ]
                , data: new ResponsePagination()               
            }  
            ,[]
        )
        this.title = "Situação do Ofício"
        this.subTitle = "Consultar o Ofício do requisitório"
        this.breadcrumbs = [...this.breadcrumbs,{title:this.title}]
    }
    controls: { [key: string]: FormControl } = {
        secao: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change', validators: [Validators.required] })
        , numProc: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        , nomeBenef: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        , nomeExato: new FormControl(false, { initialValueIsDefault:true, updateOn: 'blur', validators: [] })            
        , numOab: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        , numDocBenef: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        
    }
}

export class RequisitorioOficioFilter extends Filters {
    constructor() {
        super();
    }
}

export class RequestOficioByDocum extends RequestSearchByDocum {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
            , dtDepositoFin : ctrls['dataFin'].value }
    }
}
export class RequestOficioByNumSeq extends RequestSearchByNumSeq {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
    }
}
export class RequestOficioByAcaoOrig extends RequestSearchByAcaoOrig {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
            , dtDepositoFin : ctrls['dataFin'].value } 
    }
}
export class RequestOficioByNumProc extends RequestSearchByNumProc {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
    }
}
export class RequestOficioByNumReq extends RequestSearchByNumReq {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
    }
}
export class RequestOficioByVara extends RequestSearchByVara {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
            , dtDepositoFin : ctrls['dataFin'].value } 
    }
}
export class RequestOficioByAcaoExec extends RequestSearchByAcaoExec {
    constructor(ctrls: { [key: string]: FormControl}) {
        super(ctrls) 
        this.data ={...this.data,dtDepositoIni : ctrls['dataIni'].value
            , dtDepositoFin : ctrls['dataFin'].value } 
    }
}

//Criar O Objeto de Requisição de acordo com a opção de consulta selecionada.
export function getRequestSearch(op: string, ctrls: { [key: string]: FormControl}): RequestSearchByAny {
    const obj: { [key: string]: RequestSearchByAny } = {
          '0': new RequestOficioByDocum(ctrls)
        , '1': new RequestOficioByNumSeq(ctrls)
        , '2': new RequestOficioByAcaoOrig(ctrls)
        , '3': new RequestOficioByNumProc(ctrls)
        , '4': new RequestOficioByNumReq(ctrls)
        , '5': new RequestOficioByVara(ctrls)
        , '6': new RequestOficioByAcaoExec(ctrls)
    }
    return obj[op];
}


