import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-changeprice',
  templateUrl: './changeprice.component.html',
  styleUrls: ['./changeprice.component.css']
})
export class ChangepriceComponent implements OnInit {
  medicineprice:Medicineprice[];
  showMedicine:boolean=false;
  editRowId:any='';
  temp:any=false;



   

  constructor(private authService:AuthService) { }
  
  ngOnInit(): void {
    this.authService.viewAllMedicinePrice().subscribe(medicineprice=>
      this.medicineprice=medicineprice);
      console.log(this.medicineprice[0].medname);
    
  }


  Edit(val){
     
    this.editRowId=val;
  }
 


  Add(){
    
    console.log(this.medicineprice.length);
    this.temp=true;
  }
  //this will edit the changes in the datbase
  Save(val){
    
    this.authService.saveeditedmed(this.medicineprice[val]).subscribe(data=>{
      if(data.success){
       
      }
      else{

  
      }
    });


    
  }

 


}
interface Medicineprice{
  medname:string,
  price:Number,
  id:string,
  
  }

