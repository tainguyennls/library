import { NgModule } from '@angular/core';
import { LoanSlipRoutingModule } from './loan-slip-routing.module';
import { AddLoanSlipComponent } from './add-loan-slip/add-loan-slip.component';
import { LoanSlipDetailComponent } from './loan-slip-detail/loan-slip-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { LoanSlipComponent } from './loan-slip.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    LoanSlipRoutingModule,
  ],
  declarations: [
    LoanSlipComponent,
    AddLoanSlipComponent,
    LoanSlipDetailComponent
  ],
})
export class LoanSlipModule { }
