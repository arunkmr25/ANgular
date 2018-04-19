import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from './service/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private auth: AuthService) {}
 JwtHelper: JwtHelper = new JwtHelper();
  ngOnInit() {
    const token = localStorage.getItem('TokenString');
    const Userdet = localStorage.getItem('UserDetails');
    if (token) {
      this.auth.decodeToken = this.JwtHelper.decodeToken(token);
    }
    if (Userdet) {
      this.auth.currentUser = JSON.parse(Userdet);
      if (this.auth.currentUser.photoUrl != null) {
      this.auth.changeMemberPhoto(this.auth.currentUser.photoUrl);
      } else {
        this.auth.changeMemberPhoto('../assets/users.png');
      }
    }
  }
}
