import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{Router} from '@angular/router';
import {TransferService} from '../../services/transfer.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Globals} from '../../services/glob';
@Component({
  selector: 'app-viewpreforpatient',
  templateUrl: './viewpreforpatient.component.html',
  styleUrls: ['./viewpreforpatient.component.css']
 
})
export class ViewpreforpatientComponent implements OnInit {
  uname:string=this.globals.uname;
  prescription:Prescription[];
  constructor(private authService:AuthService,
    private router:Router,
    private transferService:TransferService,private flashMessage:FlashMessagesService,
    private globals: Globals) { }

  ngOnInit(): void {
    const obj={uname:this.uname}
  
    this.authService.viewPrescriptionpat(obj).subscribe(prescription=>{
      if(prescription.success==false){
        this.flashMessage.show(prescription.msg,{cssClass:'alert-danger',timeout:5000});
        //this.router.navigate(['home']);
        
      }
      else{
        this.prescription=prescription;
      }
    });
  }
  

  /*
  Submit()
  {
    const obj={uname:this.uname}
  
    this.authService.viewPrescriptionpat(obj).subscribe(prescription=>{
      if(prescription.success==false){
        this.flashMessage.show(prescription.msg,{cssClass:'alert-danger',timeout:5000});
        //this.router.navigate(['home']);
        
      }
      else{
        this.prescription=prescription;
      }
    });
  }
*/
checkout(i)
{
  this.transferService.setData(this.prescription[i]);

  this.router.navigate(['viewfull']);
}
}
interface Prescription{
  medname:string[],
    breakfast:string[],
    lunch:string[],
    username:string
    
}