import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
    selector:'app-acao-executoria-filter'
    ,templateUrl:'./acao-executoria-filter.component.html'
})
export class AcaoExecutoriaFilterComponent implements OnChanges{
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números entre 10 à 12 caracteres"
    title = 'Ação Executória';
    protected validators: ValidatorFn[] = [
        Validators.pattern(/^[0-9]*$/)
        ,Validators.minLength(10)
        ,Validators.maxLength(12)        
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['acaoOriginaria'].addValidators( this.validators )
            this.formGroupMaster.controls['acaoOriginaria'].updateValueAndValidity()
        }
    } 
}