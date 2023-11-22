export class Filters {
    constructor() { }
    documento: string | undefined
    numProcesso?: string
    numRequisitorio?: string
    acaoOriginaria?: string
    acaoExecutoria?: string
    dataIni?: Date | undefined | null
    dataFin?: Date | undefined | null
    codTipoProc?: number
    ordenacao?: string
    numSeqIni?: number
    numSeqFin?: number
    codUf?: string
    codVara?: number
}