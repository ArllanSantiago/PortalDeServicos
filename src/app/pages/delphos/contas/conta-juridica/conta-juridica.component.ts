import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ContaJuridicaView, } from "../../../../shared/view/conta-juridica-view";

@Component({
    templateUrl:'./conta-juridica.component.html'
})
export class ContaJuridicaComponent{
    constructor(){
        this.contaJuridicaView = new ContaJuridicaView(this.showDetail.bind(this))
        this.formContaJuridica = new FormGroup(this.contaJuridicaView.controls)
    }
    contaJuridicaView : ContaJuridicaView
    showDetail(e:any){}
    onClearControl(){}
    onSearch(){}


    formContaJuridica:FormGroup


}