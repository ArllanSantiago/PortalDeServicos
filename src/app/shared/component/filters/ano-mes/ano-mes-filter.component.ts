import { Component, Input, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { DateRegEx } from "../@validators/regex/date.regex";


@Component({
    selector:'app-ano-mes-filter'
    ,templateUrl:'./ano-mes-filter.component.html'
    ,styleUrls:['../filters.style.css']
})
export class AnoMesFilterComponent{
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe 6 números. 4 para o ano e 2 para o mês"
    protected validators: ValidatorFn[] = [
         Validators.pattern(DateRegEx.AnoMes)                  
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['anoMes'].addValidators( this.validators )
            this.formGroupMaster.controls['anoMes'].updateValueAndValidity()
        }
    }
}