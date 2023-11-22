import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-button-renderer',
  template: 
  `
    <button type="button" style="width:14rem"
      class="col h-75 p-0 mb-1 nav-item btn btn-outline-info" 
      (click)="onClick($event)">{{label}} 
      <i [class]="classIcon"></i>
    </button>
  `    
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params :any = {...{},label:undefined, classIcon:undefined};
  label?: string;
  classIcon?: string;
  refresh(params?: any): boolean {
    return true;
  }
  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.classIcon = this.params.classIcon || "fa fa-plus";
  }
  constructor() { }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

}
