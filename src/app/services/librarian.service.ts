import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Librarian } from '../models/librarian';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private apiService: ApiService) { }

  all(): Observable<RootObj<[Librarian]>> {
    return this.apiService.get<RootObj<[Librarian]>>(this.apiService.apiUrl.librarians);
  }

  get(id): Observable<RootObj<Librarian>> {
    return this.apiService.get<RootObj<Librarian>>(`${this.apiService.apiUrl.librarians}/${id}`);
  }

  delete(id): Observable<RootObj<Librarian>> {
    return this.apiService.delete<RootObj<Librarian>>(`${this.apiService.apiUrl.librarians}/status/${id}`);
  }

  save(data: Librarian): Observable<RootObj<Librarian>> {
    if (typeof data.idLibrarian !== 'undefined') {
      return this.apiService.put<RootObj<Librarian>>(`${this.apiService.apiUrl.librarians}/${data.idLibrarian}`, data);
    } else {
      return this.apiService.post<RootObj<Librarian>>(this.apiService.apiUrl.librarians, data);
    }
  }
}
