import { Component, Input } from "@angular/core";
import { jsPDF } from "jspdf";


@Component({
    selector: 'app-pdf'
    , template: `
    <button type="submit" [disabled]="false"
          class="nav-item btn btn-sm btn-outline-danger m-1" (click)="baixarPDF()" id="btnSalvarConfig">
          Baixar PDF
    </button>`
})
export class PdfComponent {
    _data: jsPDF = new jsPDF();
    @Input() set data(value:jsPDF){
        this._data = value;
    }
    get data(){
        return this._data;
    }
    @Input() nameArq = 'temp';

    async baixarPDF(): Promise<any> {
        this.data.save(`${this.nameArq}.pdf`)
    }
}