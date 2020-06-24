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
    
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
   
    this.drugload();

    

  }

  drugload()
  {

    this.authService.viewDrugs().subscribe(drug=>{
     
      
      this.drug=drug;

  });

  }

 
 


}


interface Drug{
  mname:string,
    desc:string,
    uses:string,
    pre:string
    
}

