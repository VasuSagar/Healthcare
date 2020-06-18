import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {TransferService} from '../../services/transfer.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import *as jsPDF from 'jspdf'
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-checkoutprescription',
  templateUrl: './checkoutprescription.component.html',
  styleUrls: ['./checkoutprescription.component.css']
})
export class CheckoutprescriptionComponent implements OnInit {
  @ViewChild('content') content:ElementRef;
  //medicineprice:Medicineprice;
              //medicineprice:{price:Number,total:Number};
  medicineprice:Medicineprice;
  total:number=0;
  data=this.transferService.getData();
  
 

  constructor(private transferService:TransferService,private router:Router,
    private authService:AuthService,
    private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    var x;
    var mediname={medname:this.data.medname,quant:this.data.quantity};
    this.authService.viewMedicinePrice(mediname).subscribe(medicineprice=>
    
      this.medicineprice=medicineprice);
      console.log(this.medicineprice);
     
        for(x in this.medicineprice.price)
        {console.log(JSON.stringify(this.medicineprice.price[x]));
          this.total=this.total+this.medicineprice.price[x];
        }
       
      

      


    

  }

  public downloadpdf(){
    this.updateQuantity();
    console.log("PDF WORKS");
    let doc=new jsPDF();

    let specialElementHandlers={
      '#editor':function(element,renderer){
        return true;
      }
    };

    let content=this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });

    doc.save('tst.pdf')

  }

  public goBack()
  {
    
  }

  updateQuantity()
  {var x;

    var obj={
              medname:[],
              quantity:[]
            
            };
            
            for(x in this.medicineprice.medname)
            {
              obj.medname[x]=this.medicineprice.medname[x];
              obj.quantity[x]=this.medicineprice.quantity[x];
            }
            
           this.authService.updatequant(obj).subscribe(data=>{
              
             
                   //after inserting prescription to database
              
           

           
        });
        this.flashMessage.show("Checkout Successful",{cssClass:'alert-success',timeout:5000});
              this.router.navigate(['graph']);

  }
  

  

}
interface Medicineprice{
  medname:string[],
  price:number[],
  quantity:number[],
  total:number
    
  }