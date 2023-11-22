import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Uf } from "./uf";
import { UfService } from "./uf.service";

@Component({
    selector: 'app-uf-filter'
    ,changeDetection: ChangeDetectionStrategy.Default
    , templateUrl: './uf-filter.component.html'
})
export class UfFilterComponent implements OnChanges {
    constructor(private ufService: UfService ){
        this.ufs = this.ufService.ufs;  
    }
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid:string = "Informe apenas números entre 10 à 12 caracteres"
    protected validators: ValidatorFn[] = []
    title = 'UF';
    _ufs: Uf[] = new Array<Uf>();   
    get ufs() {
        return this._ufs;
    }
    set ufs(value: Uf[]) {
        this._ufs = value;
        if (this.ufs.length > 0 && !this.formGroupMaster?.controls['codUf'].value) {
            this.formGroupMaster?.controls['codUf'].setValue(this.ufs[0].coduf);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["formGroupMaster"].isFirstChange()){               
            this.formGroupMaster.controls['codUf'].addValidators( this.validators )
            this.formGroupMaster.controls['codUf'].updateValueAndValidity()
        }
    }
}