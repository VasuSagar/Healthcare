import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-encyclo',
  templateUrl: './encyclo.component.html',
  styleUrls: ['./encyclo.component.css']
})
export class EncycloComponent implements OnInit {
    drug:Drug [];
    disease:Disease[];
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
   

    

  }

  drugload()
  {

    this.authService.viewDrugs().subscribe(drug=>{
     
      
      this.drug=drug;

  });

  }

  diseaseload()
  {
    this.authService.viewDiseases().subscribe(disease=>{
     
      
      this.disease=disease;
  });
 


}
}

interface Drug{
  mname:string,
    desc:string,
    uses:string,
    pre:string
    
}

interface Disease{
  dname:string,
    desc:string,
    symp:string,
    tre:string,
    cause:string
    
}
