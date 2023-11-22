import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  constructor() { }

  static AvisoStatus:String = ''
  static AvisoStatusText:String = ''
  static AvisoMessage:String = ''
  static existeErro:boolean = false
}
