import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObj } from '../models/root-obj';
import { LoanSlipPayInfo } from '../models/loan-slip-pay-info';

@Injectable({
  providedIn: 'root'
})
export class LoanSlipPayInfoInfoService {
  constructor(private apiService: ApiService) { }

  // get all
  list(): Observable<RootObj<[LoanSlipPayInfo]>> {
    return this.apiService.get<RootObj<[LoanSlipPayInfo]>>(this.apiService.apiUrl.loanSlipPayInfos);
  }
  get(id): Observable<RootObj<LoanSlipPayInfo>> {
    return this.apiService.get<RootObj<LoanSlipPayInfo>>(`${this.apiService.apiUrl.loanSlipPayInfos}/${id}`);
  }
  delete(id): Observable<RootObj<LoanSlipPayInfo>> {
    return this.apiService.delete<RootObj<LoanSlipPayInfo>>(`${this.apiService.apiUrl.loanSlipPayInfos}/${id}`);
  }
  save(data: LoanSlipPayInfo): Observable<RootObj<LoanSlipPayInfo>> {
    if (data.id === 0) {
      return this.apiService.post<RootObj<LoanSlipPayInfo>>(this.apiService.apiUrl.loanSlipPayInfos, data);
    } else {
      return this.apiService.put<RootObj<LoanSlipPayInfo>>(`${this.apiService.apiUrl.loanSlipPayInfos}/${data.id}`, data);
    }
  }
}
