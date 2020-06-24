import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit {
  apidata=[];
loading = true;
Highcharts: any;
chartOptions: any;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    const ob={axis:[]};
    var x;
    this.authService.getgraph2().subscribe(data=>{
      for(x in data)
      {
         ob[x]=data[x].name;
      }
      console.log(ob);
      
      this.Highcharts = Highcharts;
      this.chartOptions = { 
        title: {
        text: 'Sales Chart'
    },

    subtitle: {
        text: 'Highest sales'
    },

    xAxis: {
        categories:ob
    },

      series: [{
        type: 'column',
        colorByPoint: true,
        data:data,
      showInLegend: false}]
    };
    this.loading = false;
  },
  () => { });
}

}
