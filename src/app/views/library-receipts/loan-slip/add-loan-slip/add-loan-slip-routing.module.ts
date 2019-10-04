import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLoanSlipComponent } from './add-loan-slip.component';

const routes: Routes = [
    {
        path: '',
        component: AddLoanSlipComponent,
        data: {
            title: 'Add new Loan slip'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddLoanSlipRoutingModule { }
