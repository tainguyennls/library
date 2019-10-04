import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorComponent } from './author.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorComponent,
    data: {
      title: 'Author'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule {}
