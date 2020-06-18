
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, find} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DiseaseComponent } from '../disease/disease.component';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-addfinal',
  templateUrl: './addfinal.component.html',
  styleUrls: ['./addfinal.component.css']
})
export class AddfinalComponent implements OnInit {
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
  displayedColumns: string[] = ['medname', 'breakfast','lunch'];

  constructor(private _formBuilder: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {


   this.authService.getDoctordisname().subscribe(disease=>{
     
     
      this.options=disease;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
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

  }
  



}
interface Disease{
  dname:string,

  did:string
  
  }


