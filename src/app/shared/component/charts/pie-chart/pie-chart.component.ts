import { Component, AfterViewInit, Input } from "@angular/core";
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Decimation, Filler, Legend, Title, Tooltip, PieController, ArcElement } from "chart.js";
import { ColorsChart } from "../chart";

@Component({
    selector: 'app-pie-chart'
    , templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements AfterViewInit {
    constructor() {
        Chart.register(BarElement, BarController, ArcElement, CategoryScale,LinearScale, PieController, Decimation, Filler, Legend, Title, Tooltip);
    }
    @Input() nameColumns!: string[]
    @Input() datasets!:DataSetPieChart[]
 
    _idChart:string = 'pieChart'
    @Input() set idChart(value:string){this._idChart = value};
    get idChart():string {
        return this._idChart
    } 
    
    context?: CanvasRenderingContext2D;
    pieCanvas?:HTMLCanvasElement;    
    ngAfterViewInit(): void {
        this.pieCanvas = <HTMLCanvasElement>document.getElementById(this.idChart)    
        this.context  = <CanvasRenderingContext2D>this.pieCanvas.getContext('2d');           
        new Chart(this.context, {
            type: 'pie',
            data: {
                labels: this.nameColumns,
                datasets: this.datasets.map(dt => {return {...dt,hoverOffset:30}})
            },

            options: {
                plugins:{
                    legend:{
                        position:'right'
                    }
                    ,title:{
                        text:'Grafico Pizza'
                    }
                }
            }
        });
    }
}    




export type DataSetPieChart ={
    label:string
    data:number[]
    backgroundColor:ColorsChart[] | string[]
    borderColor:ColorsChart[] | string[]
    borderWidth:number
}