import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-ensyclo2',
  templateUrl: './ensyclo2.component.html',
  styleUrls: ['./ensyclo2.component.css']
})
export class Ensyclo2Component implements OnInit {
  disease:Disease[];
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.diseaseload();
  }

  diseaseload()
  {
    this.authService.viewDiseases().subscribe(disease=>{
     
      
      this.disease=disease;
  });

}
}
interface Disease{
  dname:string,
    desc:string,
    symp:string,
    tre:string,
    cause:string
    
}
