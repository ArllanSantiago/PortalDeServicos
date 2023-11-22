import { FormControl, Validators } from "@angular/forms"
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic"
import { HeaderGridCorrelacao } from "src/app/shared/enum/header-grid-correlacao.enum"
import { ResponsePagination } from "src/app/shared/model/response-pagination.model"

export class CorrelacaoView {
    constructor(private showDetail: (e: any) => void) {

    }
    controls: { [key: string]: FormControl } = {
        codCnjCjf: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , descrCnj: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , nomeExato: new FormControl(false, { initialValueIsDefault: true, updateOn: 'change'})
        , indAtivo: new FormControl(true, { initialValueIsDefault: true, updateOn: 'change' })
    }
    grid: GridBasic = {
        columns: [
            { headerName: HeaderGridCorrelacao.paiCnj, field: "paiCnj", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridCorrelacao.filhoCnj, field: "filhoCnj", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridCorrelacao.cjf, field: "cjf", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridCorrelacao.cnj, field: "cnj", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridCorrelacao.descricao, field: "descricao", resizable: true, sortable: true, width: 100, filter: true }
            , { headerName: HeaderGridCorrelacao.acoes, field: 'acoes', resizable: true, sortable: true, width: 50, filter: true }
        ]
        ,
         data: new ResponsePagination()
    }
}