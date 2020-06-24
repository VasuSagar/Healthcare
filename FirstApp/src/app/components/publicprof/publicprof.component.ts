import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-publicprof',
  templateUrl: './publicprof.component.html',
  styleUrls: ['./publicprof.component.css']
})
export class PublicprofComponent implements OnInit {
  currentUrl;
  username;
  email;
  foundProfile = false;
  messageClass;
  message;
  user;
  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL parameters on page load
    // Service to get the public profile data


    this.authService.getProfileDoctorbyname(this.currentUrl.username).subscribe(profile=>{
      this.user=profile.user;
      //console.log(this.user);
    },
    err=>{
      console.log(err);
      return false;
      
    });



  }

}
