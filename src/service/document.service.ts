import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../core/http-client.service';
import { HttpHeaders } from '@angular/common/http';
import {DocumentListResponse} from "../model/document";


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private httpClientService: HttpClientService) {}

  public getAll():Observable<DocumentListResponse> {
    return this.httpClientService.get('/document');
  }

  public upload(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    })
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
    })
    return this.httpClientService.postFormData('/document/', formData, headers);
  }

  public update(id: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    })
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
    })
    return this.httpClientService.putFormData('/document/'+id, formData, headers);
  }

  public delete(id: number): Observable<any> {
    return this.httpClientService.delete('/document/' + id);
  }

  public downloadDocument(documentId: number):Observable<BlobPart>{
    return this.httpClientService.getFile<any>('/document/' + documentId + '/download',{}, new HttpHeaders())
  }
}
