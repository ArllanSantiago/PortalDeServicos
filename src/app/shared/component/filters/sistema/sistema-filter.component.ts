import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-sistema-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./sistema-filter.component.html`
    ,styleUrls:['../filters.style.css']
})
export class SistemaFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
    lsSistema: {value:string ,descr:string}[] = [
        {value:'',descr:'Selecione...'}
        ,{value:'0',descr:'Todos'}
        ,{value:'1',descr:'Tebas'}
        ,{value:'2',descr:'PJe'}
        ,{value:'3',descr:'Creta'}
        ,{value:'4',descr:'DJ'}
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){          
            this.formGroupMaster.controls['sistema'].addValidators( this.validators )
            this.formGroupMaster.controls['sistema'].updateValueAndValidity()
        }
    }
 
}