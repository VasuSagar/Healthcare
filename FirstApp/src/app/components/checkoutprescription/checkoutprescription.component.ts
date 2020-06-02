import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {TransferService} from '../../services/transfer.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import *as jsPDF from 'jspdf'
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
  data=this.transferService.getData();
  
 

  constructor(private transferService:TransferService,private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    
    var mediname={medname:this.data.medname};
    this.authService.viewMedicinePrice(mediname).subscribe(medicineprice=>
      this.medicineprice=medicineprice);
    

    
    

  }

  public downloadpdf(){
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
  

  

}
interface Medicineprice{
  pricee:number[],
  total:number
    
  }