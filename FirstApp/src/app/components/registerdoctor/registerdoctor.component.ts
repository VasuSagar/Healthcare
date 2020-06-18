import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

import{Router} from '@angular/router';

@Component({
  selector: 'app-registerdoctor',
  templateUrl: './registerdoctor.component.html',
  styleUrls: ['./registerdoctor.component.css']
})
export class RegisterdoctorComponent implements OnInit {
  name:string;
  username:string;
  email:string;
  password:string;

  constructor(private ValidateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
  onRegisterSubmit(){
    const user={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }


    if(!this.ValidateService.validateRegister(user)){
      this.flashMessage.show("Please Fill in All The Fields",{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    if(!this.ValidateService.validateEmail(user.email)){
      this.flashMessage.show("Please Use A Valid Email Address",{cssClass:'alert-danger',timeout:3000});
      return false;
    } 

    //Register DOCTOR

    this.authService.registerDoctor(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.show("You are now Registered and can log in",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/logindoctor']);
      }
      else{

        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/registerdoctor']);
      }
    });



  }

}
