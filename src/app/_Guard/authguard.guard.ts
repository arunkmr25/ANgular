import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/Auth.service';
import { AlertService } from '../service/alert.service';

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.alert.error(
        'please login to access any page that you are trying to access'
      );
      this.router.navigate(['/home']);
      return false;
    }
  }
}
