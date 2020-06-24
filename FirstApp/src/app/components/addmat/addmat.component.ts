import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, find} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DiseaseComponent } from '../disease/disease.component';
import { DataSource } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
 const ELEMENT_DATA: Prescription[] = [
   //{medname: 'botyle', breakfast :"1",lunch:"0"},

 ];
@Component({
  selector: 'app-addmat',
  templateUrl: './addmat.component.html',
  styleUrls: ['./addmat.component.css']
})
export class AddmatComponent implements OnInit {
  username:any;
  //here to
  dname:any ///doctor name
  hname:any //hospital name
  disease:any;
  presc : Prescription = {
    medname :"",
    breakfast :"",
    lunch :"",
    quantity:0,

  };

  //here temp



  myControl = new FormControl();
  myControl2 = new FormControl();

  //options: string[] = ['One', 'Two', 'Three'];
  options: string[];
  //options2: string[] = ['1', '2', '3','11','22','33'];
  options2:string[];
  obj:Disease;
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  
  varr;
  varr1;
  //below is tmep
  displayedColumns: string[] = ['medname', 'breakfast','lunch','quantity'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  

  constructor(private _formBuilder: FormBuilder, private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getProfileDoctor().subscribe(profile => {
       
     this.dname=profile.user.name;
     this.hname=profile.user.hname;
     
    });


   this.authService.getDoctordisname().subscribe(disease=>{
     
     
      this.options=disease;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

     
      

  });
  this.authService.getDoctordAllmed().subscribe(prescription=>{
    this.options2=prescription;
    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter2(value))
    );
     
     
   });

  this.authService.getDoctordisid().subscribe(did=>{
    this.obj=did;
    console.log(this.obj);
  });



    
    
  }


 

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter(option2 => option2.toLowerCase().includes(filterValue));
  }

 


  submit()
  {
    //console.log(this.options[i]);
   // console.log("hi");
    console.log(JSON.stringify(this.varr));
    console.log(JSON.stringify(this.varr1));
   //console.log(form.value);
  }


  oncg(op)
  {var x;
    
    this.disease=op;
   //console.log(op); //here we got the name of disease.Now we will find it's id from obj
   //console.log("ID IS"+this.finddiseaseid(op));
    const obj={did:this.finddiseaseid(op)};
    
    this.authService.getDoctormed(obj).subscribe(prescription=>{
     this.options2=prescription;
     this.filteredOptions2 = this.myControl2.valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter2(value))
     );
      
      
    });
    
  }

  finddiseaseid(dname){        //this function will find disease's id
    var x;
    for(x in this.obj){
      if(this.obj[x].dname==dname)
        return this.obj[x].did; 
    }
  }

  addNew()
  {
    ELEMENT_DATA.push(this.presc)
    
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.presc = {
      medname :"",
      breakfast :"",
      lunch :"",
      quantity:0
   };
   

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


submitPrescription()
      {
        var x;
        const presc={
                
        medname:[],
        breakfast:[],
          lunch:[],
          quantity:[],
          username:this.username,
          dname:this.dname,
          hname:this.hname,
          disease:this.disease,
          otp:this.generateOTP()
      }

      for(x in ELEMENT_DATA){
        presc.medname[x]=ELEMENT_DATA[x].medname;
        presc.breakfast[x]=ELEMENT_DATA[x].breakfast;
        presc.lunch[x]=ELEMENT_DATA[x].lunch;
        presc.quantity[x]=Number(ELEMENT_DATA[x].quantity);
      
      }
      console.log(presc);

  this.authService.addPrescription2(presc).subscribe(data=>{
    if(data.success){
        


         //after inserting prescription to database
         this.flashMessage.show("Prescription successfully submitted",{cssClass:'alert-success',timeout:5000});
         this.router.navigate(['dashboard']);
     
    }
    else{
      this.flashMessage.show("Invalid Username",{cssClass:'alert-danger',timeout:5000});
     

    }
  });
}



}
interface Disease{
  dname:string,

  did:string
  
  }

  interface Prescription{
    medname:string,
    breakfast:string,
    lunch:string,
    quantity:number
    
    }


