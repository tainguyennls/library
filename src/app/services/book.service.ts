import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[Book]>> {
    return this.apiService.get<RootObj<[Book]>>(this.apiService.apiUrl.books);
  }
  get(id): Observable<RootObj<Book>> {
    return this.apiService.get<RootObj<Book>>(`${this.apiService.apiUrl.books}/${id}`);
  }
  getByBookTitle(id): Observable<RootObj<[Book]>> {
    return this.apiService.get<RootObj<[Book]>>(`${this.apiService.apiUrl.books}/bookTitle/${id}`);
  }
  delete(id): Observable<RootObj<Book>> {
    return this.apiService.delete<RootObj<Book>>(`${this.apiService.apiUrl.books}/${id}`);
  }
  save(data: Book): Observable<RootObj<Book>> {
    if (typeof data.idBook === 'undefined') {
      return this.apiService.post<RootObj<Book>>(this.apiService.apiUrl.books, data);
    } else {
      return this.apiService.put<RootObj<Book>>(`${this.apiService.apiUrl.books}/${data.idBook}`, data);
    }
  }
}
