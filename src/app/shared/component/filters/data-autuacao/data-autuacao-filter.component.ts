import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-data-autuacao-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./data-autuacao-filter.component.html`
    ,styleUrls:['../filters.style.css']
})
export class DataAutuacaoFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
   
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['dataAutuacaoIni'].addValidators( this.validators )
            this.formGroupMaster.controls['dataAutuacaoFin'].addValidators( this.validators )
            this.formGroupMaster.controls['dataAutuacaoIni'].updateValueAndValidity()
        }
    }
 
}