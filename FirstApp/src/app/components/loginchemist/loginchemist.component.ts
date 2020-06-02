import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-loginchemist',
  templateUrl: './loginchemist.component.html',
  styleUrls: ['./loginchemist.component.css']
})
export class LoginchemistComponent implements OnInit {
  password:string;
  email:string;
  constructor(private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user={
      email:this.email,
      password:this.password
    }

    this.authService.authenticateChemist(user).subscribe(data=>{
        if(data.success){
          this.authService.storeChemistData(data.token,data.user);
            this.flashMessage.show("You are Logged In",{cssClass:'alert-success',timeout:5000});
            this.router.navigate(['profile']);
          
        } 
        else{
            this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:5000});
            this.router.navigate(['login']);
        } 

    });

  }

}
