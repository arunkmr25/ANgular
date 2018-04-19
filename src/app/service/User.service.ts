import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './Auth.service';
import { Pagination, PaginationResult } from '../models/Pagination';

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient , private auth: AuthService) {}
  getUsers(pageNumber?: number , pageSize?: number, userParams?: any) {
    const paginationresult: PaginationResult<User []> = new PaginationResult<User []>();
    let queryString = '?';
    if (pageNumber != null && pageSize != null) {
      queryString += 'pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&';
    }
    if (userParams != null) {
      queryString +=  'minAge=' + userParams.minAge + '&maxAge=' +
       userParams.maxAge + '&gender=' + userParams.gender + '&orderBy=' + userParams.orderBy;
    }
    return this.http
      .get<Pagination>(this.baseUrl + 'user' + queryString, {observe: 'response'}).map(response => {
        if (response) {
          paginationresult.result = response.body;
          if (response.headers.get('pagination')) {
              paginationresult.pagination = JSON.parse(response.headers.get('pagination'));
          }
          return response;
        }
      })
      .catch(this.handleErrors);
  }
  getUser(id: number) {
    return this.http
    .get(this.baseUrl + 'user/' + id)
    .catch(this.handleErrors);
  }

  updateUser(id: number, user: User) {
    return this.http.put( this.baseUrl + 'user/' + id , user).catch(this.handleErrors);
  }

  setMainPhoto(userId: number, id: number ) {
    return this.http.post(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setmain', {}).catch(this.handleErrors);
  }
  DeletePhoto(userId: number, id: number ) {
    return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id , {}).catch(this.handleErrors);
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
