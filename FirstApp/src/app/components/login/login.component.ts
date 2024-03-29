import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Globals} from '../../services/glob';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
   password:string;
   email:string;
  
   constructor(private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private globals: Globals) {

   }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user={
      email:this.email,
      password:this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
        if(data.success){
          this.authService.storeUserData(data.token,data.user);
            this.flashMessage.show("You are Logged In",{cssClass:'alert-success',timeout:5000});
            this.router.navigate(['dashboard']);

            //temp
            this.globals.set(data.user.username);
           // console.log(this.globals.uname);
          
        } 
        else{
            this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:5000});
            this.router.navigate(['login']);
        } 

    });

  }

}
