import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { AuthorBookTitle } from '../models/author-book-title';

@Injectable({
  providedIn: 'root'
})
export class AuthorBookTitleService {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[AuthorBookTitle]>> {
    return this.apiService.get<RootObj<[AuthorBookTitle]>>(this.apiService.apiUrl.authorBookTitles);
  }
  get(id): Observable<RootObj<AuthorBookTitle>> {
    return this.apiService.get<RootObj<AuthorBookTitle>>(`${this.apiService.apiUrl.authorBookTitles}/${id}`);
  }
  delete(id): Observable<RootObj<AuthorBookTitle>> {
    return this.apiService.delete<RootObj<AuthorBookTitle>>(`${this.apiService.apiUrl.authorBookTitles}/${id}`);
  }
  save(data: AuthorBookTitle): Observable<RootObj<AuthorBookTitle>> {
    return this.apiService.post<RootObj<AuthorBookTitle>>(this.apiService.apiUrl.authorBookTitles, data);
  }
  postAuthors(data: AuthorBookTitle[]): Observable<RootObj<[AuthorBookTitle]>> {
    return this.apiService.post<RootObj<[AuthorBookTitle]>>(`${this.apiService.apiUrl.authorBookTitles}/addAuthors`, data);
  }
}
