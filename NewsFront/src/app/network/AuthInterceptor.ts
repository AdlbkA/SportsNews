import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access = localStorage.getItem('access')
        if(access) {
            const newReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${access}`)
            });
            return next.handle(newReq)
        }
        return next.handle(req)
    }

    
    
}

export const AuthInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
}