import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLoanSlipComponent } from './add-loan-slip/add-loan-slip.component';
import { LoanSlipComponent } from './loan-slip.component';
import { LoanSlipDetailComponent } from './loan-slip-detail/loan-slip-detail.component';


const routes: Routes = [
    {
        path: '',
        // component: LoanSlipComponent,
        data: {
            title: 'Loan slip'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: LoanSlipComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'add-loan-slip',
                component: AddLoanSlipComponent,
                data: {
                    title: 'Add new loan slip'
                }
            },
            {
                path: 'loan-slip-detail/:id',
                component: LoanSlipDetailComponent,
                data: {
                    title: 'Loan slip detail'
                }
            },
            {
                path: 'loan-slip-detail',
                redirectTo: '',
                data: {
                    title: ''
                }
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoanSlipRoutingModule { }
