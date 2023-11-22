import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-data-intervalo-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./data-intervalo-filter.component.html`
    ,styleUrls:['../../filters.style.css']
})
export class DataIntervaloFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    @Input() tittle!:string;
    @Input() controlNameIni!:string;
    @Input() controlNameFin!:string;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
   
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls[this.controlNameIni].addValidators( this.validators )
            this.formGroupMaster.controls[this.controlNameFin].addValidators( this.validators )
            this.formGroupMaster.controls[this.controlNameIni].updateValueAndValidity()
            this.formGroupMaster.controls[this.controlNameFin].updateValueAndValidity()
        }
    }
 
}