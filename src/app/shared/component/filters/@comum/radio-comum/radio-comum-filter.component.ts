import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-radio-comum-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./radio-comum-filter.component.html`
    ,styleUrls:['../../filters.style.css']
})
export class RadioComumFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    @Input()controlName!:string
    @Input()tittle?:string

    @Input()lista!:{value:string, descr:string}[] 
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
        
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){        
            this.formGroupMaster.controls[this.controlName].addValidators( this.validators )
            this.formGroupMaster.controls[this.controlName].updateValueAndValidity()
        }
    }
 
}