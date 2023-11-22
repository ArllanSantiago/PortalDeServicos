import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ItemDetalhe, MovDetalheModel } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal";
import { MovDetalheModalService } from "src/app/shared/component/grid/modal/mov-detalhe-modal/mov-detalhe-modal.service";
import { ResponsePagination } from "src/app/shared/model/response-pagination.model";
import Swal from "sweetalert2";
import {CniaView } from "../../../shared/view/cnia-view"
import { CniaService } from "../../../shared/services/cnia.service";
import { Cnia } from "src/app/shared/model/cnia";
declare let $: any

@Component({
    templateUrl: './cnia.component.html'
})
export class CniaComponent {
    constructor(private movDetalheModalService: MovDetalheModalService
        , private cniaService: CniaService
        ) {    
        this.formCnia = new FormGroup(this.cniaView.controls)  
                        
    }
    formCnia!: FormGroup
    cniaView = new CniaView(this.onShowDetail.bind(this))       
    
    onSearch() {
        const CONTROLS = this.formCnia.controls;        
        let respPag:ResponsePagination = new ResponsePagination();
        // realiza a busca via API
        let response = 
        this.cniaService.getLogEnviados().subscribe({
            next :((res)=>{
                console.log(res)
                if(res){                   
                    const newContent = res.content.map((item: Cnia)=>{
                        return {numprocform: item.dthroper , descrTipoProc:item.descrpess}
                    })
                    respPag = {...res,content:newContent}                                                    
                }
            })
            ,complete:()=>{ 
                console.log(">>>>",respPag)
                this.cniaView.grid = {...this.cniaView.grid, data: respPag } 
               
                Swal.fire('Consulta Realizada',"<h1>MPS<h1>","success")}
        })
        response.unsubscribe();
        // tratar response 
       /*
        response = {
            ...response, content: response.content.map((item: ResponseConsultaProc) => {
                return { ...item, descrTipoProc: `${item.codTipoProc}-${item.descrtipoproc}` }

            })
        }

        //carrega a grid    
        this.cniaView.grid.data = response;*/

    }

    onClearControl() {
        Object.keys(this.cniaView.controls).forEach(key => {
            this.formCnia.reset()
            this.cniaView.grid.data = new ResponsePagination()
        })
    }

    onShowDetail(e: any) {
        //Abre o modal
        console.log("teste", e)
        var myModal = document.getElementById('myModal');
        $(myModal).modal('show');
        //Busca todos os dados que respondem ao requisitorio selecionado na grid
        const DETAIL: any[] = []
        //Carrega os dados do modal
        //const detalhes = this.cniaService.getDetalheProcesso(e.rowData.numprocform)
        const resumoDetail :ItemDetalhe[] =  [
            {key: 'Documento', value:'08427793456'}
            ,{key: 'Nome', value:'Arllan Felipe'}
            ,{key: 'Data Nasc', value:'04/07/1990'}
            ,{key: 'Cidade', value:'Recife'}
            ,{key: 'UF', value:'PE'}
            ,{key: 'Pais', value:'Brasil'}
        ]       
        this.movDetalheModalService.loadDetail.emit(new MovDetalheModel(e.rowData.numprocform,resumoDetail));
    }

    onDownPdf() {
    }
    onDownXlsx() {
    }

    onCarregarGrafico(){              
    }

}