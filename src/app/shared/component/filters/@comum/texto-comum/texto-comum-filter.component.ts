import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-texto-comum-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./texto-comum-filter.component.html`
    ,styleUrls:['../../filters.style.css']
})
export class TextoComumFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    @Input()controlName!:string
    @Input()tittle:string ="tittle"
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
    
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){        
            this.formGroupMaster.controls[this.controlName].addValidators( this.validators )
            this.formGroupMaster.controls[this.controlName].updateValueAndValidity()
        }
    }
 
}