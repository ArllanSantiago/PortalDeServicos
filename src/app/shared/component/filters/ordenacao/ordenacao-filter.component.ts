import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Ordenacao } from "./ordenacao";

@Component({
    selector:'app-ordenacao-filter'
    ,templateUrl:'./ordenacao-filter.component.html'
})
export class OrdenacaoFilterComponent  implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números entre 10 à 12 caracteres"
    _listaOrdenacao:Ordenacao[] = [];
    get listaOrdenacao(){
        return this._listaOrdenacao;
    }
    @Input() set listaOrdenacao(value :Ordenacao[]){
        this._listaOrdenacao = value;       
    }

    protected validators: ValidatorFn[] = []
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['ordenacao'].addValidators( this.validators )
            this.formGroupMaster.controls['ordenacao'].updateValueAndValidity()
        }
    }   
}