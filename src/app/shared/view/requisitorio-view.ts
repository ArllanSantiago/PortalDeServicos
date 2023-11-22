import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { HeaderGridProcesso } from "src/app/shared/enum/header-grid-processo.enum";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";

export class RequisitorioView{
    constructor(private showDetail: (e: any) => void) {}
    controlsReq: { [key: string]: FormControl } = {
        secao: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change', validators: [Validators.required] })
        , regiaoFederal: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , dataIni: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , dataFin: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , numRequisitorio: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , sistema: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , situacao: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })          
    }
    controlsOficio: { [key: string]: FormControl } = {
        anoMes: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })     
    }
    grid: GridBasic = {
        columns: [
            { headerName: HeaderGridProcesso.numprocform, field: "numprocform", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridProcesso.descrTipoProc, field: "descrTipoProc", resizable: true, sortable: true, width: 600, filter: true }
            , {
                headerName: HeaderGridProcesso.btn, field: 'btn', width: 60, sortable: true, filter: false, headerCheckboxSelection: false, checkboxSelection: false
                , cellRenderer: 'buttonRenderer' 
                , cellRendererParams: {
                    onClick: this.showDetail
                    , label: undefined
                }
            }
        ]
        , data: new ResponsePagination()
    }
}