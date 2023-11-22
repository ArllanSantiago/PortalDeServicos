import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { HeaderGridAtenas } from "src/app/shared/enum/header-grid-atenas.enum";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";


export class AtenasView {
    constructor(private showDetail: (e: any) => void) {

    }
    controls: { [key: string]: FormControl } = {
        secao: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , numExpediente: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , numProcesso: new FormControl('', { initialValueIsDefault: true, updateOn: 'change', validators: [Validators.required] })
        , dataRecebimentoIni: new FormControl(false, { initialValueIsDefault: true, updateOn: 'change', validators: [] })
        , dataRecebimentoFin: new FormControl(false, { initialValueIsDefault: true, updateOn: 'change', validators: [] })

    }
    grid: GridBasic = {
        columns: [
            { headerName: HeaderGridAtenas.expediente, field: "expediente", resizable: true, sortable: true, width: 600, filter: true }
            , { headerName: HeaderGridAtenas.local, field: "local", resizable: true, sortable: true, width: 600, filter: true }
            , { headerName: HeaderGridAtenas.dtRecebimento, field: "dtRecebimento", resizable: true, sortable: true, width: 600, filter: true }
            , { headerName: HeaderGridAtenas.totalProcessos, field: "totalProcessos", resizable: true, sortable: true, width: 600, filter: true }
            , { headerName: HeaderGridAtenas.mensagemProcessamento, field: "mensagemProcessamento", resizable: true, sortable: true, width: 600, filter: true }
            , { headerName: HeaderGridAtenas.detalhe, field: "detalhe", resizable: true, sortable: true, width: 600, filter: true }
        ]
        , data: new ResponsePagination()
    }

}
