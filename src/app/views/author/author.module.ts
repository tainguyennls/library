
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';

@NgModule({
  imports: [
    ModalModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    AuthorRoutingModule,
  ],
  declarations: [ AuthorComponent ]
})
export class AuthorModule { }


