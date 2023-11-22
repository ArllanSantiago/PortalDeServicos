import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
    selector: `app-seq-classe-filter`
    , templateUrl: `./seq-classe-filter.component.html`
})
export class SeqClasseFilterComponent implements OnChanges{
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números entre 10 à 12 caracteres"
    title = 'Intervalo Sequencial';
    protected validators: ValidatorFn[] = [
        Validators.pattern(/^[0-9]*$/)
        ,Validators.minLength(10)
        ,Validators.maxLength(12)                
    ]
    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){
            this.formGroupMaster.controls['numSeqIni'].addValidators( this.validators )
            this.formGroupMaster.controls['numSeqFin'].addValidators( this.validators )
            this.formGroupMaster.controls['numSeqIni'].updateValueAndValidity()
            this.formGroupMaster.controls['numSeqFin'].updateValueAndValidity()
        }
    } 
}