import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

/*
apidata=[ { name: 'Botyle', y: 101 },
{ name: 'Isofenyle', y: 12 },
{ name: 'Propyl', y: 31 },
{ name: 'Crocine', y: 3 },
{ name: 'Dispereine', y: 8 },
{ name: 'Penicilin', y: 69 },
{ name: 'skroy', y: 11 } ];
*/
apidata=[];
loading = true;
constructor(private authService:AuthService) { }

Highcharts: any;
chartOptions: any;
/*
  Highcharts: typeof Highcharts = Highcharts; 
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Browser market shares in January, 2018'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: this.apidata
  }]
}

  */
  

  ngOnInit(): void {
    
    this.authService.getgraph().subscribe(data=>{
      this.Highcharts = Highcharts;
      this.chartOptions = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: "Medicines Stock"
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
          }
      },
         
      series: [{
        name: 'stock',
        colorByPoint: true,
        data: data
    }]
      };
      this.loading = false;
  },
  () => { });
   
    
  }

}
