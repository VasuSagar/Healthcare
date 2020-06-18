import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Globals} from '../../services/glob';
@Component({
  selector: 'app-logindoctor',
  templateUrl: './logindoctor.component.html',
  styleUrls: ['./logindoctor.component.css']
})
export class LogindoctorComponent implements OnInit {
   
  password:string;
  email:string;
 
  constructor(private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private globals: Globals) { }

  ngOnInit(): void {
  }
  onLoginSubmit(){
    const user={
      email:this.email,
      password:this.password
    }

    this.authService.authenticateDoctor(user).subscribe(data=>{
        if(data.success){
          this.authService.storeDoctorData(data.token,data.user);
            this.flashMessage.show("You are Logged In",{cssClass:'alert-success',timeout:5000});
            this.router.navigate(['dashboard']);
            this.globals.set(data.user.username);
        } 
        else{
            this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:5000});
            this.router.navigate(['login']);
        } 

    });

  }

}
