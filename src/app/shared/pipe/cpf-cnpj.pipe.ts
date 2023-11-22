import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'cpfcnpj'
})
export class CpfCnpjPipe implements PipeTransform {
    transform(value:string){
        const doc:string = value.replace(/[^\d]/g, "");        
        return doc.length == 11? 
            doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            :doc.length > 11?doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
            :value;
    }
}