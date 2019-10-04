import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReaderTypeComponent } from './reader-type.component';

const routes: Routes = [
  {
    path: '',
    component: ReaderTypeComponent,
    data: {
      title: 'Reader Type'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaderTypeRoutingModule {}
