import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { SubjectBookTitle } from '../models/subject-book-title';

@Injectable({
  providedIn: 'root'
})
export class SubjectBookTitleService {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[SubjectBookTitle]>> {
    return this.apiService.get<RootObj<[SubjectBookTitle]>>(this.apiService.apiUrl.subjectBookTitles);
  }
  get(id): Observable<RootObj<SubjectBookTitle>> {
    return this.apiService.get<RootObj<SubjectBookTitle>>(`${this.apiService.apiUrl.subjectBookTitles}/${id}`);
  }
  delete(id): Observable<RootObj<SubjectBookTitle>> {
    return this.apiService.delete<RootObj<SubjectBookTitle>>(`${this.apiService.apiUrl.subjectBookTitles}/${id}`);
  }
  save(data: SubjectBookTitle): Observable<RootObj<SubjectBookTitle>> {
    return this.apiService.post<RootObj<SubjectBookTitle>>(this.apiService.apiUrl.subjectBookTitles, data);
  }
  postSubjects(data: SubjectBookTitle[]): Observable<RootObj<[SubjectBookTitle]>> {
    return this.apiService.post<RootObj<[SubjectBookTitle]>>(`${this.apiService.apiUrl.subjectBookTitles}/addSubjects`, data);
  }
}
