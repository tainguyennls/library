import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { BooksDetail } from '../models/book-detail';

@Injectable({
  providedIn: 'root'
})
export class BooksDetailService {

  constructor(private apiService: ApiService) { }

  getBookAndBookTitleBaseId(id): Observable<RootObj<BooksDetail>> {
    return this.apiService.get<RootObj<BooksDetail>>(`${this.apiService.apiUrl.books}/booksloanslip/${id}`);
  }
}
