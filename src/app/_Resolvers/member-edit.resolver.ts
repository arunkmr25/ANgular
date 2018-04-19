import { AlertService } from './../service/alert.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/User.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/of';
import { AuthService } from '../service/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private user: UserService,
    private alertify: AlertService,
    private route: Router,
    private auth: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    console.log(this.auth.decodeToken.nameid);
    return this.user.getUser(this.auth.decodeToken.nameid).catch(error => {
      this.alertify.error('data not retrieved');
      this.route.navigate(['/matches']);
      return Observable.of(null);
    });
  }
}
