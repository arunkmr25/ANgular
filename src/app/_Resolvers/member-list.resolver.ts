import { AlertService } from './../service/alert.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/User.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/of';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageSize = 12;
  PageNumber = 1;
     /***
   */
  constructor(
    private user: UserService,
    private alertify: AlertService,
    private route: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.user.getUsers(this.PageNumber, this.pageSize).catch(error => {
      this.alertify.error('data not retrieved');
      this.route.navigate(['/']);
      return Observable.of(null);
    });
  }
}
