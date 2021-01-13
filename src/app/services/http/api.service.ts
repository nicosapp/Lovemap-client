import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@app/../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {}

  url(url) {
    return `${env.baseApiUrl}/${url}`;
  }
  get<T>(url) {
    return this.http.get(this.url(url));
  }
  post<T>(url, data) {
    return this.http.post(this.url(url), data);
  }
  patch<T>(url, data) {
    return this.http.post(this.url(url), data);
  }
  delete<T>(url, data?: any) {
    return this.http.post(this.url(url), data);
  }
}
