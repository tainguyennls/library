import { NgModule } from '@angular/core';
import { AddLoanSlipComponent } from './add-loan-slip.component';
import { AddLoanSlipRoutingModule } from './add-loan-slip-routing.module';


@NgModule({
  imports: [
    AddLoanSlipRoutingModule
  ],
  declarations: [
    AddLoanSlipComponent,
  ],
})
export class AddLoanSlipModule { }
