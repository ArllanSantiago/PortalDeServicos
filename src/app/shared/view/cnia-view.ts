import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { HeaderGridProcesso } from "src/app/shared/enum/header-grid-processo.enum";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";


export class CniaView {
    constructor(private showDetail: (e: any) => void) {

    }
    controls: { [key: string]: FormControl } = {
        numProcesso: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , dataIni: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , dataFin: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , situacao: new FormControl('0', { initialValueIsDefault: true, updateOn: 'change', validators: [] })
    }
    grid: GridBasic = {
        columns: [
            { headerName: HeaderGridProcesso.numprocform, field: "numprocform", resizable: true, sortable: true, width: 600, filter: true }
            , { headerName: HeaderGridProcesso.descrTipoProc, field: "descrTipoProc", resizable: true, sortable: true, width: 600, filter: true }
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



