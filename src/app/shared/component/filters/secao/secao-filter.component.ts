import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-secao-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./secao-filter.component.html`
    ,styleUrls:['../filters.style.css']
})
export class SecaoFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
    lsSecao: {value:string ,descr:string}[] = [
        {value:'',descr:'Selecione...'}
        ,{value:'TR',descr:'TRF - 5ª Região'}
        ,{value:'AL',descr:'Seção de Alagoas'}
        ,{value:'CE',descr:'Seção do Ceará'}
        ,{value:'PB',descr:'Seção do Paraíba'}
        ,{value:'PE',descr:'Seção do Pernambuco'}
        ,{value:'RN',descr:'Seção do Rio Grande do Norte'}
        ,{value:'SE',descr:'Seção do Sergipe'}
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){     
            this.formGroupMaster.controls['secao'].addValidators( this.validators )
            this.formGroupMaster.controls['secao'].updateValueAndValidity()
        }
    }
 
}