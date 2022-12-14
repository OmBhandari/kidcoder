import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loader: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.isloading.next(true);
    // console.log(req.url);


    return next.handle(req).pipe(
      finalize(
        () => {
          setTimeout(()=>{
            this.loader.isloading.next(false);
          }, 1000);
          
        }
      )
    )
  }
}
