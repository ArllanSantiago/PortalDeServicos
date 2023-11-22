import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(protected toasterService: ToastrService) { }

  enviarMensagemSucesso(): void { // status 200: ok
    this.enviarMensagemSucessoParam('Operação realizada com sucesso!');
  }

  enviarMensagemObrigatorio(nomeCampo: string): void {
    this.enviarMensagemAlerta(`O campo ${nomeCampo} é obrigatório.`, 5000);
  }

  enviarMensagemSucessoParam(mensagem: string, titulo?: string): void { // status 200: ok
    this.toasterService.success('<b>' + mensagem, titulo, { enableHtml: true, timeOut: 5000,
      disableTimeOut: false, closeButton: true, tapToDismiss: false });
  }

  enviarMensagemAlerta(mensagem: string, timeOut?: number): void { // status 404: Not Found
    this.toasterService.warning('<b>' + mensagem, '', { enableHtml: true, timeOut: timeOut || 5000,
      disableTimeOut: false, closeButton: true, tapToDismiss: false });
  }

  enviarMensagemErro(mensagem: string): void { // status 409: Conflict or 400: Bad Request
    this.toasterService.error('<b>' + mensagem, '', { enableHtml: true, timeOut: 5000,
      disableTimeOut: false, closeButton: true, tapToDismiss: false });
  }

  fecharTudo(): void {
    this.toasterService.clear();
  }

}
