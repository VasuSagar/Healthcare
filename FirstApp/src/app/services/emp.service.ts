import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs'; 
import {FlashMessagesService} from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class EmpService {
  dataChange: BehaviorSubject<Medicineprice[]> = new BehaviorSubject<Medicineprice[]>([]);
  dialogData: any;
  //;
  url:string='/api';
  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  
  getAllIssues():void {  
    this.http.get<Medicineprice[]>(this.url+'/users/viewallprice').subscribe(data=>{
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
    }

    get data(): Medicineprice[] {
      return this.dataChange.value;
    }
  
    getDialogData() {
      return this.dialogData;
    }
    addIssue (issue: Medicineprice): void {
      this.http.post(this.url+'/users/adddrug2',issue).subscribe(data => {
        this.dialogData = data;});
        this.toastr.success('Successfully Added');
    }
  
    updateIssue (issue: Medicineprice): void {
      this.http.post(this.url+'/users/editmed2',issue).subscribe(data => {
        this.dialogData = data;
       // this.flashMessage.show('Successfully edited', 3000);
        this.toastr.success('Successfully added');
      },
      (err: HttpErrorResponse) => {
        //this.flashMessage.show('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
    }
  
    deleteIssue (issue: Medicineprice): void {
    // console.log(id);
      this.http.post(this.url+'/users/deldrug2',issue).subscribe(data => {
        this.toastr.warning('Successfully deleted');
      
      });

    }


}

interface Medicineprice{
  medname:string,
  price:number,
  quantity:number,
  sales:number,
  id:string
  
  }
  interface Meddel
  {
    id:number
  }

