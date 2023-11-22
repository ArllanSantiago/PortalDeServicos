import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
    selector:'app-num-requisitorio-filter'
    ,changeDetection:ChangeDetectionStrategy.OnPush
    ,templateUrl:'./num-requisitorio-filter.component.html'
    ,styleUrls:['../filters.style.css']
})
export class NumRequisitorioFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números entre 10 à 12 caracteres"
    protected validators: ValidatorFn[] = [
         Validators.pattern(/^[0-9]*$/)
         ,Validators.minLength(10)
         ,Validators.maxLength(12)
         
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['numRequisitorio'].addValidators( this.validators )
            this.formGroupMaster.controls['numRequisitorio'].updateValueAndValidity()
        }
    }
 
}