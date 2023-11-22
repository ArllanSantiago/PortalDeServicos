import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";

@Component({
    selector: `app-tipo-processo-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    ,templateUrl: `./tipo-processo-filter.html`
    ,styleUrls:['../filters.style.css']
})
export class TipoProcessoFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
    lsTipoProc: {value:string ,descr:string}[] = [
        {value:'',descr:'Selecione...'}
        ,{value:'388',descr:'Precatório'}
        ,{value:'399',descr:'RPV'}
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['codTipoProc'].addValidators( this.validators )
            this.formGroupMaster.controls['codTipoProc'].updateValueAndValidity()
        }
    }
 
}