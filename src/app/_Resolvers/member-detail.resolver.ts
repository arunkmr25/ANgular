import { AlertService } from './../service/alert.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/User.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/of';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private user: UserService,
    private alertify: AlertService,
    private route: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.user.getUser(route.params['id']).catch(error => {
      this.alertify.error('data not retrieved');
      this.route.navigate(['/matches']);
      return Observable.of(null);
    });
  }
}
