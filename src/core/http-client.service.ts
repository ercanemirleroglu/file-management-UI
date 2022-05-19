import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {environment} from "../environments/environment";

const httpHeaders: HttpHeaders = new HttpHeaders({
  "Content-Type": "application/json",
});

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  public backendUrl: string = environment.api.url;
  public publicUrl: string = environment.public.url;

  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.backendUrl + url, {
      headers: httpHeaders,
    });
  }

  public post(url: string, request: any): Observable<any> {
    return this.httpClient.post(this.backendUrl + url, request, {
      headers: httpHeaders,
    });
  }

  public postWithHeaders(url: string, request: any, headers: any): Observable<any> {
    return this.httpClient.post(this.backendUrl + url, request, {
      headers: headers,
    });
  }

  public postPublic(url: string, request: any): Observable<any> {
    return this.httpClient.post(this.publicUrl + url, request, {
      responseType: "text",
      headers: httpHeaders,
    });
  }

  public put(url: string, request: any): Observable<any> {
    return this.httpClient.put(this.backendUrl + url, request, {
      headers: httpHeaders,
    });
  }

  public putFormData(url: string, formData: FormData, headers: any): Observable<any> {
    return this.httpClient.put(this.backendUrl + url, formData, {
      headers: headers,
    });
  }

  public postFormData(url: string, formData: FormData, headers: any): Observable<any> {
    return this.httpClient.post(this.backendUrl + url, formData, {
      headers: headers,
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(this.backendUrl + url, {
      headers: httpHeaders,
    });
  }

  public getByteArray<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.backendUrl + url, {
      responseType: "arraybuffer" as "json",
    });
  }

  public postByteArray(url: string, request: any): Observable<any> {
    return this.httpClient.post(this.backendUrl + url, request, {
      responseType: "arraybuffer" as "json",
      headers: httpHeaders,
    });
  }

  public uploadFile(url: string, request: any): Observable<any> {
    return this.httpClient.post(this.backendUrl + url, request, {
      headers: new HttpHeaders({}),
    });
  }

  public getFile<T>(url: string, request: any, headers: HttpHeaders): Observable<any> {
    return this.httpClient.post<T>(this.backendUrl + url,request, {
      headers: headers,
      responseType: 'blob' as 'json',
    })
  }
}
