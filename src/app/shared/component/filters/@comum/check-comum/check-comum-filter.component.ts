import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";
@Component({
    selector: `app-check-comum-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./check-comum-filter.component.html`
    ,styleUrls:['../../filters.style.css']
})
export class CheckComumFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    @Input() controlName!:string;
    @Input() tittle!:string;
    @Input() id!:string;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []   
    ngOnChanges(changes: SimpleChanges): void {                  
        if(changes["formGroupMaster"].isFirstChange()){                   
            this.formGroupMaster.controls[this.controlName].addValidators( this.validators )
            this.formGroupMaster.controls[this.controlName].updateValueAndValidity()
        }
    }
 
}