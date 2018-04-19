import { AlertService } from './../service/alert.service';
import { AuthService } from './../service/Auth.service';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginModel: any = {};
  showLogout = true;
  photoNavUrl: string;
  constructor(public auth: AuthService, private alertify: AlertService , private router: Router) {
    this.showLogout = true;
  }

  ngOnInit() {
    this.auth.currentPhotoURL.subscribe(photourl => this.photoNavUrl = photourl);
    this.showLogout = true;
  }
  login() {
    this.auth.login(this.loginModel).subscribe(data => {
      this.alertify.success('Successfully logged in');
      this.showLogout = true;
    }, error => {
      this.alertify.error('Invalid Credentials');
    }, () => {
      this.router.navigate(['/matches']);
    }
  );
  }
  Logout() {
    this.auth.basetoken = null;
    this.auth.currentUser = null;
    localStorage.removeItem('TokenString');
    localStorage.removeItem('UserDetails');
    this.alertify.warning('logged out');
    this.router.navigate(['/home']);
  }
  loggedin() {
    const token = localStorage.getItem('TokenString');
    return !!token;
    // return this.auth.loggedIn;
  }
}
