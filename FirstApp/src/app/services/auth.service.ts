import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  authToken:any;
  user:any;


  options;
  constructor(private http:Http) { }

  registerUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/register',user,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }
  //reg for doc
  registerDoctor(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/registerdoctor',user,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }
  //reg for chemist
  registerChemist(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/registerchemist',user,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }

  authenticateUser(user){

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/authenticate',user,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }


  //auth for doc
  authenticateDoctor(user){  

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/authenticatedoctor',user,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }

  //auth for chemist
  //auth for doc
  authenticateChemist(user){  

    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/authenticatechemist',user,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }


  getProfile(){
    let headers=new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:1331/users/profile',{headers:headers})
    .map(res=>res.json()); //observable so we use .map
  }

  getProfileChemist(){
    let headers=new Headers();
    this.loadTokenChemist();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:1331/users/profile',{headers:headers})
    .map(res=>res.json()); //observable so we use .map
  }

  getProfileDoctor(){
   
    let headers=new Headers();
    this.loadTokenDoctor();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:1331/users/profile',{headers:headers})
    .map(res=>res.json()); //observable so we use .map
   
  }


  storeUserData(token, user) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;

  }

  //store login details of chemist in local storage

  storeChemistData(token, user) {
    localStorage.setItem('id_tokenchemist',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;

  }
  //store login details of doctor in local storage

  storeDoctorData(token, user) {
    localStorage.setItem('id_tokendoctor',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;

  }

  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }

  //load chemist token
  loadTokenChemist(){
    const token=localStorage.getItem('id_tokenchemist');
    this.authToken=token;
  }

  //load doctor token
  loadTokenDoctor(){
    const token=localStorage.getItem('id_tokendoctor');
    this.authToken=token;
  }

 

  //for authentication guard
  //to check if we are logged so that /login,/register can be disabled
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  //log in status for chemist
  loggedInChemist(){
    return tokenNotExpired('id_tokenchemist');
  }

  //log in status for doctor
  //log in status for chemist
  loggedInDoctor(){
    return tokenNotExpired('id_tokendoctor');
  }


  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }



  //function for adding prescirption to database
  addPrescription(prescirption){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/addprescription',prescirption,{headers:headers})
    .map(res=>res.json()); //observable so we use .map
  }

  viewPrescription(obj){         
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/viewprescription',obj,{headers:headers})
    .map(res=>res.json());
    
  }
  /*
  viewPrescription(){         //backup 
    
    return this.http.get('http://localhost:1331/users/viewprescription')
    .map(res=>res.json());
    
  }
  */

  viewMedicinePrice(medname){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/viewprice',medname,{headers:headers})
    .map(res=>res.json());
  }

  //to store drug in database
  registerDrug(drug){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/registerdrug',drug,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }

  viewDrugs(){
    return this.http.get('http://localhost:1331/users/viewdrugs')
    .map(res=>res.json());
    
  }

  //to register disease in database
  registerDisease(disease){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/registerdisease',disease,{headers:headers})
    .map(res=>res.json()); //observable so we use .map

  }

  viewDiseases(){
    
    return this.http.get('http://localhost:1331/users/viewdiseases')
    .map(res=>res.json());
    
  }

  viewAllMedicinePrice(){
  
    return this.http.get('http://localhost:1331/users/viewallprice')
    .map(res=>res.json());
  }

  saveeditedmed(medobj){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/editmed',medobj,{headers:headers})
    .map(res=>res.json()); //observable so we use .map
  }

  //below is for dispalying too
  saveeditedmed2(medobj){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:1331/users/editmed2',medobj,{headers:headers})
    .map(res=>res.json()); //observable so we use .map
  }

  // Function to get public profile data
  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get('http://localhost:1331/users/publicProfile/' + username, this.options).map(res => res.json());
  }

   // Function to create headers, add token, to be used in HTTP requests
   createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  getProfileDoctorbyname(username){
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get('http://localhost:1331/users/publicProfile1/' + username, this.options).map(res => res.json());
  }



}
