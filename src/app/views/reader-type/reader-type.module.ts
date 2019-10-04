
import { NgModule } from '@angular/core';

import { ReaderTypeComponent } from './reader-type.component';
import { ReaderTypeRoutingModule } from './reader-type-routing.module';
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
        ReaderTypeRoutingModule,
    ],
    declarations: [ReaderTypeComponent]
})
export class ReaderTypeModule { }


