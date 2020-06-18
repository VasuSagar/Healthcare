import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuardDoctor implements CanActivate{
    constructor(private authService:AuthService,
        private router:Router){

    }

    canActivate(){
        if(this.authService.loggedInDoctor()){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }

   
}