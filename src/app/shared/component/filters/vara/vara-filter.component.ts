import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";
import { Subscription } from "rxjs";
import { Vara } from "./vara";
import { VaraService } from "./vara.service";

@Component({
    selector: 'app-vara-filter'
    , changeDetection: ChangeDetectionStrategy.Default
    , templateUrl: './vara-filter.component.html'
})
export class VaraFilterComponent implements OnChanges, OnDestroy {
    @Input() formGroupMaster!: FormGroup;
    feedBackInvalid: string = "Informe apenas números entre 10 à 12 caracteres"
    protected validators: ValidatorFn[] = []
    subcriptions: Subscription[] = []
    title: String = 'Vara'
    varas: Vara[] = []
    vara?: Vara;

    constructor(private varaServ: VaraService) {
        console.log('const')
    }
    async onLoadVaras() {
        if (this.formGroupMaster.controls['codUf'].value) {
            await this.varaServ.buscarVaraPorDocumento(
                this.formGroupMaster.controls['codUf'].value).then((resp) => {
                    this.varas = resp as Vara[]
                    this.formGroupMaster.controls['codVara'].setValue(this.varas[0]?.codvara)
                })
        }

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["formGroupMaster"].isFirstChange()) {
            this.onLoadVaras();
            this.subcriptions.push(
                this.formGroupMaster.controls['codUf']?.valueChanges.subscribe(codUf => {
                    this.onLoadVaras();
                })
            )
            this.formGroupMaster.controls['codVara'].addValidators(this.validators)
            this.formGroupMaster.controls['codVara'].updateValueAndValidity()
        }
    }
    ngOnDestroy(): void {
        this.subcriptions.forEach(sub => sub.unsubscribe())
    }
}