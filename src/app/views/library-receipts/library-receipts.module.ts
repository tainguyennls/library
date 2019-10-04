import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './library-receipts-routing.module';
import { LoanSlipComponent } from './loan-slip/loan-slip.component';
import { PaymentSlipComponent } from './payment-slip/payment-slip.component';
import { CommonModule } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
  ],
  declarations: [
    PaymentSlipComponent,
    // LoanSlipComponent,
  ]
})
export class LibraryReceiptsModule {}
