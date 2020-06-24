import { Component, OnInit } from '@angular/core';
import {TransferService} from '../../services/transfer.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-viewfull',
  templateUrl: './viewfull.component.html',
  styleUrls: ['./viewfull.component.css']
})
export class ViewfullComponent implements OnInit {
  data=this.transferService.getData();
  medicineprice:Medicineprice;
  constructor(private transferService:TransferService, private authService:AuthService) { }
  
  ngOnInit(): void {
    var mediname={medname:this.data.medname,quant:this.data.quantity};
    this.authService.viewMedicinePrice(mediname).subscribe(medicineprice=>
      
      this.medicineprice=medicineprice);
      
  }

}
interface Medicineprice{
  medname:string[],
  price:number[],
  quantity:number[],
  total:number
    
  }