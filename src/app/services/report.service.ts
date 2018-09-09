import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  reportInscricoes() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(environment.baseApi + 'aje/report/inscricoes', {headers: headers, responseType: 'blob'});
  }

}
