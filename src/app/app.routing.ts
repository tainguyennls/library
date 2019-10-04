import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { AuthorComponent } from './views/author/author.component';
import { BookTitleComponent } from './views/book-title/book-title.component';
import { ReaderTypeComponent } from './views/reader-type/reader-type.component';
import { ReaderComponent } from './views/reader/reader.component';
import { SubjectComponent } from './views/subject/subject.component';
import { BookComponent } from './views/book/book.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'library-receipts',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'librarian',
        loadChildren: () => import('./views/librarian/librarian.module').then(m => m.LibrarianModule)
      },
      {
        path: 'library-receipts',
        loadChildren: () => import('./views/library-receipts/library-receipts.module').then(m => m.LibraryReceiptsModule),
      },
      {
        path: 'author',
        loadChildren: () => import('./views/author/author.module').then(m => m.AuthorModule),
      },
      {
        path: 'reader',
        component: ReaderComponent
      },
      {
        path: 'reader-type',
        loadChildren: () => import('./views/reader-type/reader-type.module').then(m => m.ReaderTypeModule),
      },
      {
        path: 'book',
        component: BookComponent
      },
      {
        path: 'book-title',
        component: BookTitleComponent
      },
      {
        path: 'subject',
        component: SubjectComponent
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
