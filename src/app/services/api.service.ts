import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  baseUrl = 'http://localhost:8888/api/v1/';
  apiUrl = {
    librarians: `${this.baseUrl}librarians`,
    authors: `${this.baseUrl}authors`,
    subjects: `${this.baseUrl}subjects`,
    bookTitles: `${this.baseUrl}book-title`,
    books: `${this.baseUrl}books`,
    readerTypes: `${this.baseUrl}reader-type`,
    readers: `${this.baseUrl}readers`,
    loanSlipPays: `${this.baseUrl}loanSlipPays`,
    loanSlipPayInfos: `${this.baseUrl}loanSlipPayInfos`,
    loanSlip: `${this.baseUrl}loan-slip`,
    authorBookTitles: `${this.baseUrl}authorBookTitles`,
    subjectBookTitles: `${this.baseUrl}subjectBookTitles`,
    upload: `${this.baseUrl}upload-photo`,
  };

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.headers });
  }

  put<T>(url: string, data: Object): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.headers });
  }

  post<T>(url: string, data: Object): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.headers });
  }
}
