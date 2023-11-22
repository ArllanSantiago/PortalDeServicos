import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { HeaderGridExtrato } from "src/app/shared/enum/header-grid-extrato.enum";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";


export class ExtratoDemoView {
    constructor(private showDetail: (e: any) => void) {
       
    }
    controls: { [key: string]: FormControl } = {
         numProcesso: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , acaoOrig: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , numRequisitorio: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , tipoReq: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , numOab: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , numDocPess: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [] })
        , dataAutuacaoIni: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , dataAutuacaoFin: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , dataDepositoIni: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , dataDepositoFin: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
    }
    grid: GridBasic = {
        columns: [
            { headerName: HeaderGridExtrato.ordem, field: "ordem", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridExtrato.numeroRequisitorio, field: "numeroRequisitorio", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridExtrato.situacao, field: "situacao", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridExtrato.dataAutuacao, field: "dataAutuacao", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridExtrato.dataDeposito, field: "dataDeposito", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridExtrato.numeroTrf5, field: "numeroTrf5", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridExtrato.acoes, field: "acoes", resizable: true, sortable: true, width: 600, filter: true }
        ]
        , data: new ResponsePagination()
    }
}