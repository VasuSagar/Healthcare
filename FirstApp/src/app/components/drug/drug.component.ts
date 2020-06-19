import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import{Router} from '@angular/router';
@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {
  mname:string;
  desc:String;
  uses:String;
  pre:String;
  
  constructor(private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {

  }

  Submit(){
    const drug={
      mname:this.mname,
      desc:this.desc,
      uses:this.uses,
      pre:this.pre
    }

    this.authService.registerDrug(drug).subscribe(data=>{
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

