import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  public handleResponse(req: HttpRequest<any>, event: any) {
    if (event instanceof HttpResponse) {
    }
  }

  public handleError(req: HttpRequest<any>, event: any) {
    if (event.status === 401 || event.status === 403) {
      //this.authService.authLogout();
    }
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken: any = `Bearer ${sessionStorage.getItem("jwtToken")}`;
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq).pipe(
      tap(
        (event) => this.handleResponse(req, event),
        (error) => this.handleError(req, error)
      )
    );
  }
}
