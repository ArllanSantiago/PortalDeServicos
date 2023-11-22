import {  ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {  FormGroup, ValidatorFn, Validators } from "@angular/forms";
@Component({
    selector: 'app-num-processo-filter'
    ,changeDetection: ChangeDetectionStrategy.OnPush
    , templateUrl: './num-processo-filter.component.html'
    , styleUrls: ['../filters.style.css']
})
export class NumProcessoFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números, 20 caracteres."
    protected validators: ValidatorFn[] = [
         Validators.pattern(/^[0-9]*$/)
         ,Validators.minLength(20)
         ,Validators.maxLength(20)
         
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){                   
            this.formGroupMaster.controls['numProcesso'].addValidators( this.validators )
            this.formGroupMaster.controls['numProcesso'].updateValueAndValidity()
        }
    }
 
}   
