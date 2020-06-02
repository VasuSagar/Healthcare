import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import{Router} from '@angular/router';
@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent implements OnInit {
  dname:string;
  desc:string;
  symp:string;
  tre:string;
  cause:string;
  constructor(private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }

  Submit(){
    const disease={
      dname:this.dname,
      desc:this.desc,
      symp:this.symp,
      tre:this.tre,
      cause:this.cause
    }

    this.authService.registerDisease(disease).subscribe(data=>{
      if(data.success){
        this.flashMessage.show("Drug registered in database",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/']);
      }
      else{

        this.flashMessage.show("Something Went Wrong",{cssClass:'alert-danger',timeout:3000});
        
      }
    });



  }

}
