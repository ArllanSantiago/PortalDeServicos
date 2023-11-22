import { Component, Input } from "@angular/core";
import * as xlsx from 'xlsx'

@Component({
    selector: 'app-xlsx'
    , template: `
    <button type="submit" [disabled]="false"
          class="nav-item btn btn-sm btn-outline-success m-1" (click)="baixarXLSX()" id="btnSalvarConfig">
          Baixar EXCEL
    </button>`
})
export class XlsxComponent {
    @Input() data:any[] = [];
    @Input() nameArq = 'temp';
    @Input() nameAba = 'result';
    async baixarXLSX(): Promise<any> {       
        var ws_name = this.nameAba, wb = xlsx.utils.book_new()
                , ws = xlsx.utils.json_to_sheet(this.data)
        xlsx.utils.book_append_sheet(wb, ws, ws_name);
        xlsx.writeFile(wb, `${this.nameArq}.xlsx`);
    }
}