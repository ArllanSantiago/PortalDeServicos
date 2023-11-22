import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";


@Component({
    selector: `app-combo-pesquisa-filter`
    ,changeDetection:ChangeDetectionStrategy.OnPush
    , templateUrl: `./combo-pesquisa-filter.component.html`
    ,styleUrls:['../../filters.style.css']
})
export class ComboPesquisaFilterComponent implements  OnChanges {
    @Input() formGroupMaster!: FormGroup;
    @Input()lista: {value:string ,descr:string}[] = []
    @Input()controlName!:string
    @Input()tittle!:string
    feedBackInvalid:string = "Campo Obrigatório"
    protected validators: ValidatorFn[] = []
    
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){        
            this.formGroupMaster.controls[this.controlName].addValidators( this.validators )
            this.formGroupMaster.controls[this.controlName].updateValueAndValidity()
        }
    }
 
}