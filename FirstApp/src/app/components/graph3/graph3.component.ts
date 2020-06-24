import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-graph3',
  templateUrl: './graph3.component.html',
  styleUrls: ['./graph3.component.css']
})
export class Graph3Component implements OnInit {
  apidata=[];
loading = true;
  constructor(private authService:AuthService) { }
  Highcharts: any;
chartOptions: any;

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


