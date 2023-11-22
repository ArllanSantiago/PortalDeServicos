import { Component, OnInit } from '@angular/core';
import { AvisoService } from './aviso.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  constructor() { }
  AvisoStatus:String = AvisoService.AvisoStatus
  AvisoStatusText:String = AvisoService.AvisoStatusText
  AvisoMessage:String = AvisoService.AvisoMessage
  existeErro:boolean = AvisoService.existeErro
  ngOnInit() {

  }

}
