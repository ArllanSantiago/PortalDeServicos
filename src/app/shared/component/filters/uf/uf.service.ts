import { Injectable } from "@angular/core";
import { Uf } from "./uf";

@Injectable({
    providedIn: 'root'
})
export class UfService {
    public ufs: Uf[] = [{ coduf: 'AC', descricao: 'Acre' }
        , { coduf: 'AL', descricao: 'Alagoas' }
        , { coduf: 'AM', descricao: 'Amazonas' }
        , { coduf: 'AP', descricao: 'Amapá' }
        , { coduf: 'BA', descricao: 'Bahia' }
        , { coduf: 'CE', descricao: 'Ceará' }
        , { coduf: 'DF', descricao: 'Distrito Federal' }
        , { coduf: 'ES', descricao: 'Espírito Santo' }       
        , { coduf: 'GO', descricao: 'Goiás' }
        , { coduf: 'MA', descricao: 'Maranhão' }
        , { coduf: 'MG', descricao: 'Minas Gerais' }
        , { coduf: 'MS', descricao: 'Mato Grosso do Sul' }
        , { coduf: 'MT', descricao: 'Mato Grosso' }
        , { coduf: 'PA', descricao: 'Pará' }
        , { coduf: 'PB', descricao: 'Paraíba' }
        , { coduf: 'PE', descricao: 'Pernambuco' }
        , { coduf: 'PI', descricao: 'Piauí' }
        , { coduf: 'PR', descricao: 'Paraná' }
        , { coduf: 'RJ', descricao: 'Rio de Janeiro' }
        , { coduf: 'RN', descricao: 'Rio Grande do Norte' }
        , { coduf: 'RO', descricao: 'Rondônia' }
        , { coduf: 'RR', descricao: 'Roraima' }
        , { coduf: 'RS', descricao: 'Rio Grande do Sul' }
        , { coduf: 'SC', descricao: 'Santa Catarina' }
        , { coduf: 'SE', descricao: 'Sergipe' }
        , { coduf: 'SP', descricao: 'São Paulo' }
        , { coduf: 'TO', descricao: 'Tocantins' }
    ]
}