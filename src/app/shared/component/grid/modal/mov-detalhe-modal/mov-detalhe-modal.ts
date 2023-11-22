export class MovDetalheModel{
    constructor( title:string ,resumo:ItemDetalhe[] , partes?:ItemDetalhe[][], movimentos?:ItemDetalhe[][]){
        this.title = title
        this.resumo = resumo
        this.partes = partes? partes: []
        this.movimentos = movimentos? movimentos: []
    }
    title:string
    resumo:ItemDetalhe[]
    partes:ItemDetalhe[][]
    movimentos:ItemDetalhe[][]
}
export type ItemDetalhe ={key:string, value:string}