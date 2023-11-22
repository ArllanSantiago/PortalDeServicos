import { Component, EventEmitter, Input, ViewChild, Output } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridApi } from "ag-grid-community";
import { MovDetalheModel } from "../modal/mov-detalhe-modal/mov-detalhe-modal";
import { ButtonRendererComponent } from "../renderer/button-renderer/button-renderer.component";
import { GridBasic } from "./grid-basic";

@Component({
  selector: 'app-grid-basic'
  , templateUrl: './grid-basic.component.html'
})       
export class GridBasicComponent {  
  private _grid: GridBasic = new GridBasic();
  @Input() set grid(value: GridBasic) {
    this._grid = value;
    this.loadDataGrid()
  }
  get grid() {return this._grid;}
  @Output() getAll: EventEmitter<any[]> = new EventEmitter<any[]>()
  @Output() goPage: EventEmitter<{ page: number }> = new EventEmitter<{ page: number }>()
  @ViewChild('agGrid', { static: true }) agGrid?: AgGridAngular;

  private gridApi!: GridApi;
  public detalhes: MovDetalheModel = new MovDetalheModel("title",[]);
  public dataGrid: any[] = [];
  public frameworkComponents: any;

  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }


  goPageFirst() {
    this.goPage.emit({ page: 0 });
  }
  goPagePrevio() {
    this.goPage.emit({ page: this.grid.data.number - 1 });
  }
  goPageNext() {
    this.goPage.emit({ page: this.grid.data.number + 1 });
  }
  goPageLast() {
    this.goPage.emit({ page: this.grid.data.number - 1 });

  }
  onSelectionChanged(event:any) { }

  onGridReady(event:any) {
    this.gridApi = event.api;
    this.gridApi.hideOverlay(); 
  }
  async getElementsGrid(): Promise<any[]> {
    let items: any[] = [];
    this.gridApi.forEachNode(function (node) { items.push((<any>node.data)) });   
    return items
  }
  async loadDataGrid() {    
    if (this.gridApi) {
      this.gridApi.setRowData([])      
      this.gridApi.hideOverlay();
      this.grid.data.pageable.offset++
      this.grid.data.pageable.pageNumber++
      this.grid.data.numberOfElements = this.grid.data.numberOfElements >= this.grid.data.size ?
        this.grid.data.numberOfElements * (this.grid.data.pageable.pageNumber) : this.grid.data.totalElements
      this.gridApi.setRowData(this.grid.data.content);
      this.dataGrid = await this.getElementsGrid()
    }
  }

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };  
}


