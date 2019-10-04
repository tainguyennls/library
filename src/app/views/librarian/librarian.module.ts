
import { NgModule } from '@angular/core';

import { LibrarianComponent } from './librarian.component';
import { LibrarianRoutingModule } from './librarian-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    ModalModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    LibrarianRoutingModule,
  ],
  declarations: [ LibrarianComponent ]
})
export class LibrarianModule { }


