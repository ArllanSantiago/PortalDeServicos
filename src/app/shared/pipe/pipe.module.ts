import { NgModule } from "@angular/core";
import { CpfCnpjPipe } from "./cpf-cnpj.pipe";

@NgModule({
  declarations:[
      CpfCnpjPipe
  ]
 ,imports:[]
 ,exports:[
     CpfCnpjPipe
 ]
})
export class PipeModule{

}