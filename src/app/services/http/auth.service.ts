import { Router } from '@angular/router';
import { environment as env } from '@app/../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // CONFIGURATION PARAMS
  cookiesUrl: string = env.baseDomain + 'sanctum/csrf-cookie';
  registerUrl: string = env.baseApiUrl + '/auth/signup';
  options: any = {};
  static loggedIn: boolean = false;
  static user: object = null;

  constructor(public http: HttpClient, private router: Router) {}

  async signIn({ email, password }: Credentials) {
    try {
      await this.getCookie();
      await this.loginWith({ email, password });
      await this.fetchUser();
      this.router.navigate([env.auth.redirect.login]);
    } catch (e) {
      console.error(e);
    }
  }

  private async loginWith(credentials: Credentials): Promise<any> {
    return this.http
      .post(`${env.baseDomain}login`, credentials)
      .toPromise()
      .then((res) => {
        AuthService.loggedIn = true;
        console.log('loggedIn');
      })
      .catch((error) => {
        AuthService.loggedIn = false;
        console.error(error);
      });
  }

  async signOut() {
    await this.http
      .post(`${env.baseDomain}logout`, {})
      .toPromise()
      .then((res) => {
        AuthService.loggedIn = false;
        console.log('loggedOut');
      })
      .catch((error) => {
        console.error(error);
      });
    this.router.navigate([env.auth.redirect.logout]);
  }

  signUp(credentials: RegisterCredentials) {
    console.log(credentials);
  }

  async fetchUser(): Promise<any> {
    return this.http
      .get(`${env.baseApiUrl}/user`)
      .toPromise()
      .then((res: DataResponse) => {
        AuthService.loggedIn = true;
        console.log('authenticated', AuthService.loggedIn);
        AuthService.user = res.data;
      })
      .catch((error) => {
        AuthService.loggedIn = false;
        console.log('unauthenticated', AuthService.loggedIn);
        console.error(error);
      });
  }
  async fetchUserRedirect(): Promise<any> {
    try {
      await this.fetchUser().then(() => {
        // this.router.navigate([env.auth.redirect.login]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  private async getCookie(): Promise<any> {
    return this.http
      .get(`${this.cookiesUrl}`)
      .toPromise()
      .catch((error) => console.error(error));
  }
}

export interface Credentials {
  email: string;
  password: string;
}
export interface RegisterCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}
export interface DataResponse {
  data: any;
}
