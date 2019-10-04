import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { Reader } from '../models/reader';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[Reader]>> {
    return this.apiService.get<RootObj<[Reader]>>(this.apiService.apiUrl.readers);
  }
  get(id): Observable<RootObj<Reader>> {
    return this.apiService.get<RootObj<Reader>>(`${this.apiService.apiUrl.readers}/${id}`);
  }
  delete(id): Observable<RootObj<Reader>> {
    return this.apiService.delete<RootObj<Reader>>(`${this.apiService.apiUrl.readers}/${id}`);
  }
  save(data: Reader): Observable<RootObj<Reader>> {
    if (typeof data.idReader === 'undefined') {
      return this.apiService.post<RootObj<Reader>>(this.apiService.apiUrl.readers, data);
    } else {
      return this.apiService.put<RootObj<Reader>>(`${this.apiService.apiUrl.readers}/${data.idReader}`, data);
    }
  }
}
