import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MovDetalheModel } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal";
import { MovDetalheModalService } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal.service";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { SgpView } from "../../../shared/view/sgp-view"
import { SgpService, ResponseConsultaProc } from "../../../shared/services/sgp.service";
declare let $: any

@Component({
    templateUrl: './sgp.component.html'
})
export class SgpComponent {
    constructor(private movDetalheModalService: MovDetalheModalService
        , private SgpService: SgpService
        ) {    
        this.formSgp = new FormGroup(this.sgpView.controls)  
                        
    }
    formSgp!: FormGroup
    sgpView = new SgpView(this.onShowDetail.bind(this))       
    
    onSearch() {
        const CONTROLS = this.formSgp.controls
        const FILTERS = Object.keys(CONTROLS).map(k => { return { k: CONTROLS[k].value } })

        // realiza a busca via API
        let response = this.SgpService.getProcesso(FILTERS)
        // tratar response 
        response = {
            ...response, content: response.content.map((item: ResponseConsultaProc) => {
                return { ...item, descrTipoProc: `${item.codTipoProc}-${item.descrtipoproc}` }

            })
        }

        //carrega a grid    
        this.sgpView.grid.data = response;

    }

    onClearControl() {
        Object.keys(this.sgpView.controls).forEach(key => {
            this.formSgp.reset()
            this.sgpView.grid.data = new ResponsePagination()
        })
    }

    onShowDetail(e: any) {
        //Abre o modal
        var myModal = document.getElementById('myModal');
        $(myModal).modal('show');
        //Busca todos os dados que respondem ao requisitorio selecionado na grid
        //Carrega os dados do modal
        let resumoDetail: string[] = []

        const detalhes = this.SgpService.getDetalheProcesso(e.rowData.numprocform)
    
        //Emite o objeto para exibir no modal
        this.movDetalheModalService.loadDetail.emit(new MovDetalheModel(e.rowData.numproc, []));
    }

    onDownPdf() {
    }
    onDownXlsx() {
    }

    onCarregarGrafico(){              
    }

}