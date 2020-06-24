import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{Router} from '@angular/router';
import {TransferService} from '../../services/transfer.service'
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-viewprescription',
  templateUrl: './viewprescription.component.html',
  styleUrls: ['./viewprescription.component.css']
})
export class ViewprescriptionComponent implements OnInit {
  username;
  hname;
  uname:string;
  otp:string;
  prescription:Prescription[];
  constructor(private authService:AuthService,
    private router:Router,
    private transferService:TransferService,private flashMessage:FlashMessagesService) { }
   
  ngOnInit(): void {
  
  //  this.authService.viewPrescription(this.uname).subscribe(prescription=>
    //  this.prescription=prescription);
      //console.log(this.prescription[1]);
     
   
   
  }
  Submit()
{
  const obj={uname:this.uname,
              otp:this.otp
  }

 // this.authService.viewPrescription(obj).subscribe(prescription=>
  //  this.prescription=prescription);
    


    this.authService.viewPrescription(obj).subscribe(prescription=>{
      if(prescription.success==false){
        this.flashMessage.show(prescription.msg,{cssClass:'alert-danger',timeout:5000});
        //this.router.navigate(['home']);
        
      }
      else{
        this.prescription=prescription;
        console.log(prescription);
      }
    });
      
}
  checkout(i){
  //  console.log(this.prescription[i]);
    this.transferService.setData(this.prescription[i]);

    this.router.navigate(['checkoutprescription']);
  }


 

}
interface Prescription{
  medname:string[],
    breakfast:string[],
    lunch:string[],
    username:string
    
}