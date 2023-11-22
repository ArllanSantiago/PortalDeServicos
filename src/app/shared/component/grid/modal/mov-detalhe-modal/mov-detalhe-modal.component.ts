import { Component, Input, OnInit } from "@angular/core";
import { MovDetalheModel } from "./mov-detalhe-modal";
import { MovDetalheModalService } from "./mov-detalhe-modal.service";
declare let $:any
@Component({
    selector: 'app-mov-detalhe-modal'
    ,templateUrl: './mov-detalhe-modal.component.html'
})
export class MovDetalheModalComponent {
    constructor(movDetalheModalServ:MovDetalheModalService){
        movDetalheModalServ.loadDetail.subscribe(detail =>{
           this.dataMovDetalhe = detail;           
        })
    }

    _dataMovDetalhe:MovDetalheModel = new MovDetalheModel("",[])
    @Input('set')
    set dataMovDetalhe (value:MovDetalheModel){
        this._dataMovDetalhe = value
    }
    get dataMovDetalhe(){ 
        return this._dataMovDetalhe 
    }
}