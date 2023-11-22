import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";
@Component({
    selector: `app-regiao-federal-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./regiao-federal-filter.component.html`
    ,styleUrls:['../filters.style.css']
})
export class RegiaoFederalFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
    lsRegiaofederal: {value:string ,descr:string}[] = [
        {value:'',descr:'Selecione...'}
        ,{value:'80',descr:'Reg de Alagoas'}
        ,{value:'81',descr:'Reg do Ceará'}
        ,{value:'83',descr:'Reg do Pernambuco'}
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){          
            this.formGroupMaster.controls['regiaoFederal'].addValidators( this.validators )
            this.formGroupMaster.controls['regiaoFederal'].updateValueAndValidity()
        }
    }
 
}