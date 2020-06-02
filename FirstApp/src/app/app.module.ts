import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';


import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guard/auth.guard';
import {AuthGuardChemist} from './guard/authchemist.gard'; //guard for chemist

import { LogindoctorComponent } from './components/logindoctor/logindoctor.component';
import { LoginchemistComponent } from './components/loginchemist/loginchemist.component';
import { RegisterdoctorComponent } from './components/registerdoctor/registerdoctor.component';
import { RegisterchemistComponent } from './components/registerchemist/registerchemist.component';
import { AddprescriptionComponent } from './components/addprescription/addprescription.component';


import { ReactiveFormsModule } from '@angular/forms';
import { ViewprescriptionComponent } from './components/viewprescription/viewprescription.component';
import { CheckoutprescriptionComponent } from './components/checkoutprescription/checkoutprescription.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { AuthGuardDoctor } from './guard/authdoctor.guard';
import { EncycloComponent } from './components/encyclo/encyclo.component';
import { DrugComponent } from './components/drug/drug.component';
import { DiseaseComponent } from './components/disease/disease.component';
import { ChangepriceComponent } from './components/changeprice/changeprice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //guard for doctor

import { MatTableModule } from '@angular/material/table';
import { ChangemateComponent } from './components/changemate/changemate.component';
import {MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';

//autoinput
import{MatAutocompleteModule} from '@angular/material/autocomplete';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import { EmpService } from './services/emp.service';
import{MatIconModule} from '@angular/material/icon';
import { EditComponent } from './dialog/edit/edit.component';
import { ToastrModule } from 'ngx-toastr';
import { AddComponent } from './dialog/add/add.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditblogComponent } from './components/blog/editblog/editblog.component';
import { DelblogComponent } from './components/blog/delblog/delblog.component';
import { PublicprofComponent } from './components/publicprof/publicprof.component';
const appRoutes:Routes=[
  {path:"",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"registerchemist",component:RegisterchemistComponent},
  {path:"registerdoctor",component:RegisterdoctorComponent},
  {path:"login",component:LoginComponent},
  {path:"logindoctor",component:LogindoctorComponent},//login for doctor
  {path:"loginchemist",component:LoginchemistComponent},  //login for chemist
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardDoctor]},
  //{path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  //{path:"profile",component:ProfileComponent,canActivate:[AuthGuardChemist]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuardDoctor]},
  {path:"addprescription",component:AddprescriptionComponent,canActivate:[AuthGuardChemist]},
  {path:"checkoutprescription",component:CheckoutprescriptionComponent,canActivate:[AuthGuardChemist]},
  {path:"viewprescription",component:ViewprescriptionComponent,canActivate:[AuthGuardChemist]},
  {path:"pdfcomponent",component:PdfComponent,canActivate:[AuthGuardChemist]},
  {path:"encyclo",component:EncycloComponent,canActivate:[AuthGuardDoctor]},
  {path:"drug",component:DrugComponent,canActivate:[AuthGuardDoctor]},
  {path:"disease",component:DiseaseComponent,canActivate:[AuthGuardDoctor]},
  {path:"changeprice",component:ChangepriceComponent,canActivate:[AuthGuardChemist]},
  {path:"changemate",component:ChangemateComponent,canActivate:[AuthGuardChemist]},
  {path:"blog",component:BlogComponent,canActivate:[AuthGuardDoctor]},
  {path:"edit-blog/:id",component:EditblogComponent,canActivate:[AuthGuardDoctor]},
  {path:"delete-blog/:id",component:DelblogComponent,canActivate:[AuthGuardDoctor]},
  {path:"user/:username",component:PublicprofComponent,canActivate:[AuthGuardDoctor]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    
    DashboardComponent,
    ProfileComponent,
    RegisterComponent,
    LogindoctorComponent,
    LoginchemistComponent,
    RegisterdoctorComponent,
    RegisterchemistComponent,
    AddprescriptionComponent,
    ViewprescriptionComponent,
    CheckoutprescriptionComponent,
    PdfComponent,
    EncycloComponent,
    DrugComponent,
    DiseaseComponent,
    ChangepriceComponent,
    ChangemateComponent,
    EditComponent,
    AddComponent,
    DeleteComponent,
    BlogComponent,
    EditblogComponent,
    DelblogComponent,
    PublicprofComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot()


  ],
  providers: [ValidateService,AuthService,AuthGuard,AuthGuardChemist,AuthGuardDoctor,EmpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
