import { Component, Input, Output ,EventEmitter, SimpleChanges} from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";


@Component({
    selector:'app-acao-originaria-filter'
    ,templateUrl:'./acao-originaria-filter.component.html'
})
export class AcaoOriginariaFilterComponent{
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números entre 10 à 12 caracteres"
    title = 'Ação Originária';
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