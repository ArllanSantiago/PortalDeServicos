
export class AppConst{    
    public static UF:{descr:string}[] = [
          { descr: 'CE' }
        , { descr: 'RN' }
        , { descr: 'PB' }
        , { descr: 'PE' }
        , { descr: 'AL' }
        , { descr: 'SE' }
      ];
}

export const SYSDATA:{name:string ,version:string ,Sessions:{name:string, id:string}[]} = {
  name: `Portal de Serviços`, version: `1.0.0`
  , Sessions: [
    { name: 'TRF-5ª Região',id:'TR'}
    , { name: 'Seção do Ceara', id: 'CE' }
    , { name: 'Seção do Rio Grande do Norte', id: 'RN' }
    , { name: 'Seção do Paraiba', id: 'PB' }
    , { name: 'Seção do Pernambuco', id: 'PE' }
    , { name: 'Seção do Alagoas', id: 'AL' }
    , { name: 'Seção do Sergipe', id: 'SE' }]
}; 

export const msgNotFound = 'Dados não encontrados!'