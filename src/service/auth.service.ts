import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {HttpClientService} from "../core/http-client.service";
import {LoginRequest, LoginResponse} from "../model/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private httpClientService: HttpClientService) {}

  public authLogin() {
    this.router.navigateByUrl("");
  }

  public login(request: LoginRequest) {
    return this.httpClientService.postPublic('/login', request);
  }

  public authLogout() {
    this.clearStorage();
  }

  public clearStorage() {
    sessionStorage.removeItem('jwtToken');
  }

  get isLoggedIn(): boolean {
    return (
      sessionStorage.getItem("jwtToken") != null &&
      sessionStorage.getItem("jwtToken") !== ""
    );
  }
}
