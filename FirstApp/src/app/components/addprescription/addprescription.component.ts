import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-addprescription',
  templateUrl: './addprescription.component.html',
  styleUrls: ['./addprescription.component.css']
})
export class AddprescriptionComponent implements OnInit {
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  username:any;
  disease:any;

  //another
  selectedDisease = 0;
selectedMedicine = 0;

medicines = [];


  //for prescirption
  medname:Array<number>;
  breakfast:Array<string>;
  lunch:Array<string>;


      
  constructor(private router:Router,
    private authService:AuthService,
    private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }
  
  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
    


}

deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    console.log(this.fieldArray);       //to get breakfast of first row we will typ=>>>> this.fieldArray[0].breakfast
}



//another
onSelectDisease(disease_id: number) {
    this.selectedDisease = disease_id;
    this.selectedMedicine = 0;
    
    this.medicines = this.getMedicines().filter((item) => {
    return item.disease_id === Number(disease_id)
    });
    }


    
       
      getDiseases() {
      return [
      { id: 1, name: 'Maleriya' },
      { id: 2, name: 'Fever' },
      { id: 3, name: 'Typhoid' }
      ];
      }
       
      getMedicines() {
      return [
      { id: 1, disease_id: 1, name: 'Botyle' },
      { id: 2, disease_id: 1, name: 'Isofenyle' },
      { id: 3, disease_id: 1, name: 'Propyle' },
      { id: 4, disease_id: 2, name: 'Crocine' },
      { id: 5, disease_id: 2, name: 'Dispereine' },
      { id: 6, disease_id: 3, name: 'Penicilin' },
      ]
      }


      submitPrescription(){
        var x;
      











        const presc={
          
          medname:[],
           breakfast:[],
             lunch:[],
            username:this.username,
            otp:this.generateOTP()
        }

        for(x in this.fieldArray){
            presc.medname[x]=this.fieldArray[x].medicine;
            presc.breakfast[x]=this.fieldArray[x].breakfast;
            presc.lunch[x]=this.fieldArray[x].lunch;
          
          }

          //send otp to registered email of user
          
      

            

          this.authService.addPrescription(presc).subscribe(data=>{
            if(data.success){
                


                //after inserting prescription to database
              this.flashMessage.show("Prescription successfully submitted",{cssClass:'alert-success',timeout:5000});
              this.router.navigate(['dashboard']);
            }
            else{
              this.flashMessage.show("Invalid Username",{cssClass:'alert-danger',timeout:5000});
              this.router.navigate(['addprescription']);
    
            }
          });
 

        

       


      }

      generateOTP() { 
          
        // Declare a digits variable  
        // which stores all digits 
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 6; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP;
    } 
      



}
