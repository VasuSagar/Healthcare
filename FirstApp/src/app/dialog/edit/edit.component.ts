import { Component,Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import{EmpService} from '../../services/emp.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(public empService:EmpService,
    public authService:AuthService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
  
    submit() {
      // emppty stuff
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    stopEdit() {
    
      this.empService.updateIssue(this.data);



      /*
      this.authService.saveeditedmed(this.data).subscribe(data=>{
        if(data.success){
         
        }
        else{
  
    
        }
      });
        */
  
  
    }


}
