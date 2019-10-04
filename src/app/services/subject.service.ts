import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private apiService: ApiService) { }

  all(): Observable<RootObj<[Subject]>> {
    return this.apiService.get<RootObj<[Subject]>>(this.apiService.apiUrl.subjects);
  }
  get(id): Observable<RootObj<Subject>> {
    return this.apiService.get<RootObj<Subject>>(`${this.apiService.apiUrl.subjects}/${id}`);
  }
  getByBookTitle(id): Observable<RootObj<[Subject]>> {
    return this.apiService.get<RootObj<[Subject]>>(`${this.apiService.apiUrl.subjects}/bookTitle/${id}`);
  }
  delete(id): Observable<RootObj<Subject>> {
    return this.apiService.delete<RootObj<Subject>>(`${this.apiService.apiUrl.subjects}/status/${id}`);
  }
  save(subject: Subject): Observable<RootObj<Subject>> {
    if (typeof subject.idSubject === 'undefined') {
      return this.apiService.post<RootObj<Subject>>(this.apiService.apiUrl.subjects, subject);
    } else {
      return this.apiService.put<RootObj<Subject>>(`${this.apiService.apiUrl.subjects}/${subject.idSubject}`, subject);
    }
  }
  import(subject: Subject[]): Observable<RootObj<Subject>> {
    return this.apiService.post<RootObj<Subject>>(`${this.apiService.apiUrl.subjects}/imports`, subject);
  }
}
