import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { HeaderGridProcesso } from "src/app/shared/enum/header-grid-processo.enum";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";


export class ProcessoView {
    constructor(private showDetail: (e: any) => void) {}
    controls: { [key: string]: FormControl } = {
        secao: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change', validators: [Validators.required] })
        , numProcesso: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        , nomeBenef: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        , nomeExato: new FormControl(false, { initialValueIsDefault:true, updateOn: 'blur', validators: [] })            
        , numOab: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        , numDocBenef: new FormControl('', { initialValueIsDefault:true, updateOn: 'blur', validators: [] })
        
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