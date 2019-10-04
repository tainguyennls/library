import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { LoanSlipPay } from '../models/loan-slip-pay';

@Injectable({
  providedIn: 'root'
})
export class LoanSlipPayService {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[LoanSlipPay]>> {
    return this.apiService.get<RootObj<[LoanSlipPay]>>(this.apiService.apiUrl.loanSlipPays);
  }
  get(id): Observable<RootObj<LoanSlipPay>> {
    return this.apiService.get<RootObj<LoanSlipPay>>(`${this.apiService.apiUrl.loanSlipPays}/${id}`);
  }
  delete(id): Observable<RootObj<LoanSlipPay>> {
    return this.apiService.delete<RootObj<LoanSlipPay>>(`${this.apiService.apiUrl.loanSlipPays}/${id}`);
  }
  save(data: LoanSlipPay): Observable<RootObj<LoanSlipPay>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<LoanSlipPay>>(this.apiService.apiUrl.loanSlipPays, data);
    } else {
      return this.apiService.put<RootObj<LoanSlipPay>>(`${this.apiService.apiUrl.loanSlipPays}/${data.id}`, data);
    }
  }
}
