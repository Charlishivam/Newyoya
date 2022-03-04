import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { MasterService } from 'src/app/pages/master/master.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    private masterService: MasterService
    constructor( private injector: Injector) { }
      

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.masterService = this.injector.get(MasterService)
      
            let token = localStorage.getItem('token')

            if (token) {
                request = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${token}`,
                        'RandomKey': 'RandomValue'
                    }
                });
            }
         
           
        return next.handle(request);
    }
}
