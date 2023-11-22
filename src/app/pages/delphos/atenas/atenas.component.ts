import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MovDetalheModel } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal";
import { MovDetalheModalService } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal.service";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import { AtenasView } from "../../../shared/view/atenas-view"
import { AtenasService } from "../../../shared/services/atenas.service";
import { ConsultaProcesso } from "src/app/shared/model/consulta-processo";
declare let $: any

@Component({
    templateUrl: './atenas.component.html'
})
export class AtenasComponent {
    constructor(private movDetalheModalService: MovDetalheModalService
        , private atenasService: AtenasService
    ) {
        this.formAtenas = new FormGroup(this.atenasView.controls)

    }
    formAtenas!: FormGroup
    atenasView = new AtenasView(this.onShowDetail.bind(this))

    onSearch() {
        const CONTROLS = this.formAtenas.controls
        const FILTERS = Object.keys(CONTROLS).map(k => { return { k: CONTROLS[k].value } })

        // realiza a busca via API
        let response = this.atenasService.getProcesso(FILTERS)
        // tratar response 
        response = {
            ...response, content: response.content.map((item: ConsultaProcesso) => {
                return { ...item, descrTipoProc: `${item.codTipoProc}-${item.descrtipoproc}` }
            })
        }

        //carrega a grid    
        this.atenasView.grid.data = response;

    }

    onClearControl() {
        Object.keys(this.atenasView.controls).forEach(key => {
            this.formAtenas.reset()
            this.atenasView.grid.data = new ResponsePagination()
        })
    }

    onShowDetail(e: any) {
        //Abre o modal
        var myModal = document.getElementById('myModal');
        $(myModal).modal('show');
        //Busca todos os dados que respondem ao requisitorio selecionado na grid
        const DETAIL: any[] = []
        //Carrega os dados do modal
        let resumoDetail: string[] = []

        const detalhes = this.atenasService.getDetalheProcesso(e.rowData.numprocform)
        resumoDetail = [
            ...detalhes.partes.map(pt => {
                return `Tipo Atuação:${pt.descrTipoParte}\n`
                    + `OAB:${pt.oab}\n`
                    + `CPF/CNPJ:${pt.numdocpess}\n`
                    + `Nome da Parte:${pt.nomeparte}\n`
                    + `Personalidade:${pt.personalidade}\n`
                    + `Característica:${pt.caracteristica}\n`
            })

            , ...detalhes.movimentos.map(mov => {
                return `Data do Movimento:${mov.datamov}\n`
                    + `Fase/Descrição:${mov.codfase + '-' + mov.descfase}\n`
                    + `Complemento 1:${mov.complemento1}\n`
                    + `Complemento 2:${mov.complemento2}\n`
                    + `Observação:${mov.observacao}\n`
            })
        ]
        //Emite o objeto para exibir no modal

        this.movDetalheModalService.loadDetail.emit(new MovDetalheModel(e.rowData.numproc, []));
    }

    onDownPdf() {
    }
    onDownXlsx() {
    }

    onCarregarGrafico() {
    }

}