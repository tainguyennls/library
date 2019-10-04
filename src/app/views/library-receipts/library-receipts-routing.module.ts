import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanSlipComponent } from './loan-slip/loan-slip.component';
import { PaymentSlipComponent } from './payment-slip/payment-slip.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Library Receipts'
        },
        children: [
            {
                path: 'payment-slip',
                component: PaymentSlipComponent,
                data: {
                    title: 'Payment slip'
                }
            },
            {
                path: 'loan-slip',
                loadChildren: () => import('./loan-slip/loan-slip.module').then(m => m.LoanSlipModule),
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
