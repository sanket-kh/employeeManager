import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('inside interceptor')
    let modifiedReq = request.clone({
      headers:request.headers.append('new-header', 'hi'),
     // params: request.params.append('hi', 'hello'),
     // url: 'http://localhost/asdasdsa'
    })
    return next.handle(modifiedReq);
  }
}
