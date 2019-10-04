import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private apiService: ApiService) { }

  all(): Observable<RootObj<[Author]>> {
    return this.apiService.get<RootObj<[Author]>>(this.apiService.apiUrl.authors);
  }
  get(id): Observable<RootObj<Author>> {
    return this.apiService.get<RootObj<Author>>(`${this.apiService.apiUrl.authors}/${id}`);
  }
  getByBookTitle(id): Observable<RootObj<[Author]>> {
    return this.apiService.get<RootObj<[Author]>>(`${this.apiService.apiUrl.authors}/bookTitle/${id}`);
  }
  delete(id): Observable<RootObj<Author>> {
    return this.apiService.delete<RootObj<Author>>(`${this.apiService.apiUrl.authors}/status/${id}`);
  }
  save(data: Author): Observable<RootObj<Author>> {
    if (typeof data.idAuthor === 'undefined') {
      return this.apiService.post<RootObj<Author>>(this.apiService.apiUrl.authors, data);
    } else {
      return this.apiService.put<RootObj<Author>>(`${this.apiService.apiUrl.authors}/${data.idAuthor}`, data);
    }
  }
}
