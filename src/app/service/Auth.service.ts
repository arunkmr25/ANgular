import { Token } from './../interface/token';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../models/User';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:9999/api/Authentication/';
  header = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User;
  private photoUrl_S = new BehaviorSubject<string>('../../assets/users.png');
  currentPhotoURL = this.photoUrl_S.asObservable();
  basetoken: any;
  decodeToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: HttpClient) {}
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl_S.next(photoUrl);
  }

  login(model: any) {
    return this.http
      .post<Token>(this.baseUrl + 'login', model,
      // { headers: this.header }
    )
      .map(response => {
        if (response) {
          localStorage.setItem('TokenString', response.tokenString);
          localStorage.setItem('UserDetails', JSON.stringify(response.user));
          this.currentUser = response.user;
          this.decodeToken = this.jwtHelper.decodeToken(response.tokenString);
          this.basetoken = response.tokenString;
          if (response.user.photoUrl == null) {
            this.changeMemberPhoto('../../assets/users.png');
          } else {
          this.changeMemberPhoto(response.user.photoUrl);
          }
        }
      }).catch(this.handleErrors);
  }

  Register(model: any) {
    return this.http.post(this.baseUrl + 'register', model,
    // {
    //   headers: this.header
    // }
  ).catch(this.handleErrors);
  }
  loggedIn() {
    return tokenNotExpired('TokenString');
  }
  private handleErrors(error: any) {
    const applicationError = error.headers.get('application-error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let finalError = '';
    if (serverError) {
      for (const key of serverError) {
        if (serverError[key]) {
          finalError += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(finalError || 'Server Error');
  }
}
