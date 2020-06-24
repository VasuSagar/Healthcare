import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuardChemist implements CanActivate{
    constructor(private authService:AuthService,
        private router:Router){

    }

    canActivate(){
        if(this.authService.loggedInChemist()){
            return true;
        }
        else{
            this.router.navigate(['/']);
            return false;
        }
    }

   
}