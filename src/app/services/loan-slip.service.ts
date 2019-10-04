import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { LoanSlip } from '../models/loan-slip';
import { RootObj } from '../models/root-obj';

@Injectable({
  providedIn: 'root'
})
export class LoanSlipService {

  constructor(private apiService: ApiService) {

  }

  addNewLoanSlip(loanSlip: LoanSlip): Observable<RootObj<[LoanSlip]>>  {
    return this.apiService.post(`${this.apiService.apiUrl.loanSlip}`, loanSlip);
  }

  updateLoanSlipById(loanSlip: LoanSlip): Observable<LoanSlip> {
    return this.apiService.put(`${this.apiService.apiUrl.loanSlip}/${loanSlip.id}`, loanSlip);
  }

  deleteLoanSlipById(id): Observable<LoanSlip> {
    return this.apiService.delete(`${this.apiService.apiUrl.loanSlip}/${id}`);
  }

  getLoanSlipById(id): Observable<LoanSlip> {
    return this.apiService.get(`${this.apiService.apiUrl.loanSlip}/${id}`);
  }

  getAllLoanSlip(): Observable<RootObj<[LoanSlip]>> {
    return this.apiService.get(this.apiService.apiUrl.loanSlip);
  }
}
