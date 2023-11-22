import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RelatorioGenericoView } from 'src/app/shared/view/relatorio-generico-view';

@Component({
  templateUrl: './relatorio-generico.component.html'
})
export class RelatorioGenericoComponent {

  constructor() {
    this.formGenerico = new FormGroup(this.genericoView.controls)
    this.relatorioGenericoView = new RelatorioGenericoView(this.onShowDetail.bind(this))
        this.formGenerico = new FormGroup(this.relatorioGenericoView.controls)
  }
  formGenerico!: FormGroup
  relatorioGenericoView: RelatorioGenericoView
  genericoView = new RelatorioGenericoView(this.onShowDetail.bind(this))

  ngOnInit(): void {
  }

  onShowDetail(e: any) {

  }
}
