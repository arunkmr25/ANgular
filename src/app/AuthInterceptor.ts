import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent,
   HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse |
    HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
      const token = 'Bearer ' + localStorage.getItem('TokenString');
       const reqclone = req.clone({headers: req.headers.set('Content-Type', 'application/json').append('Authorization', token)});
       return next.handle(reqclone);
    }
}
