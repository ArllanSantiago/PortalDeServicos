import { Component,  OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ContasView } from "../../../shared/view/contas-view";
import { ContasComponentInterface } from "./contas.component.interface";
@Component({
  templateUrl: './contas.component.html'
})
export class ContasComponent implements ContasComponentInterface, OnInit {
  public contasView: ContasView = new ContasView();
  public formContas: FormGroup = new FormGroup(this.contasView.controls);
  
  constructor() {      
    /*
    this.contasView = {
      ...this.contasView
      ,title: "Contas"  
      , subTitle: "Consulta de Contas"
      , breadcrumbs: [
        { title: 'Painel', router: '/painelprc/painel' }
        , { title: "Contas", router: null }
      ]
    }*/
  }
  onSearch(urlParams: { page: number } = { page: 0 }): void { }
  ngOnInit(): void { }  
 
} 