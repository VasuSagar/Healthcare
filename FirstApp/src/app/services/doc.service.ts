import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  dataChange: BehaviorSubject<Prescription[]> = new BehaviorSubject<Prescription[]>([]);
  dialogData: any;

  constructor(private http: HttpClient,
    private toastr: ToastrService) { }


    
  
      get data(): Prescription[] {
        return this.dataChange.value;
      }
    
      getDialogData() {
        return this.dialogData;
      }
      addIssue (issue: Prescription): void {
        this.http.post('http://localhost:1331/users/addprescription2',issue).subscribe(data => {
          this.dialogData = data;});
          this.toastr.success('Successfully Added');
      }
    
      
}

interface Prescription{
  medname:string,
  breakfast:string,
  lunch:string,
  username:string
  
  }
