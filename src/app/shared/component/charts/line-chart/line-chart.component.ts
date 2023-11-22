import { Component, AfterViewInit, Input } from "@angular/core";
import { Chart,  Decimation, Filler, Legend, Title, Tooltip, LineElement, LineController, PointElement, LinearScale, CategoryScale } from "chart.js";
import { ColorsChart } from "../chart";

@Component({
    selector: 'app-line-chart'
    , templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements AfterViewInit {
    constructor() {
        Chart.register( LineElement,LineController, LinearScale, CategoryScale, PointElement, Decimation, Filler, Legend, Title, Tooltip);
    }
    @Input() nameColumns!: string[]
    @Input() datasets!:DataSetLineChart[]
 
    _idChart:string = 'lineChart'
    @Input() set idChart(value:string){this._idChart = value};
    get idChart():string {
        return this._idChart
    } 
    
    context?: CanvasRenderingContext2D;
    barCanvas?:HTMLCanvasElement;    
    ngAfterViewInit(): void {
        this.barCanvas = <HTMLCanvasElement>document.getElementById(this.idChart)    
        this.context  = <CanvasRenderingContext2D>this.barCanvas.getContext('2d');           
        new Chart(this.context, {
            type: 'line',
            data: {
                labels: this.nameColumns,
                datasets: this.datasets.map(item =>{return {...item, }})
            },

            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}    

export type DataSetLineChart ={
    label:string
    data:number[]
    fill?:boolean
    backgroundColor?:ColorsChart | string
    borderColor:ColorsChart | string
    tension?:0.1 | 0.5
}

export type LineChart ={
    idChart:string 
    columns:string[]
    dataSets:DataSetLineChart[]
}