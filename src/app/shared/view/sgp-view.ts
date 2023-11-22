import { FormControl, Validators } from "@angular/forms";
import { GridBasic } from "src/app/shared/component/grid/grid-basic/grid-basic";
import { HeaderGridSgp } from "src/app/shared/enum/header-grid-sgp.enum";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";


export class SgpView {
    constructor(private showDetail: (e: any) => void) {
       
    }
    controls: { [key: string]: FormControl } = {
        tipoRelatorio: new FormControl('', { initialValueIsDefault:true ,updateOn: 'change', validators: [Validators.required] })
        , lote: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , numProc: new FormControl('', { initialValueIsDefault:true, updateOn: 'change', validators: [Validators.required] })
        , cnpjEntidade: new FormControl(false, { initialValueIsDefault:true, updateOn: 'change', validators: [] })
        , entidade: new FormControl(false, { initialValueIsDefault:true, updateOn: 'change', validators: [] })

    }
    grid: GridBasic = {
        columns: [
            { headerName: HeaderGridSgp.codigoCidade, field: "codigoCidade", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridSgp.cidade, field: "cidade", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridSgp.uf, field: "uf", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridSgp.entidade, field: "entidade", resizable: true, sortable: true, width: 600, filter: true }
            ,{ headerName: HeaderGridSgp.cnpjEntidade, field: "cnpjEntidade", resizable: true, sortable: true, width: 600, filter: true }
        ]
        , data: new ResponsePagination()
    }

}
