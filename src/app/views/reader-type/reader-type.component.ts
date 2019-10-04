import { Component, OnInit, ViewChild } from '@angular/core';
import { ReaderType } from '../../models/reader-type';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReaderTypeservice } from '../../services/reader-type.service';

@Component({
  selector: 'app-reader-type',
  templateUrl: './reader-type.component.html',
  styleUrls: ['./reader-type.component.scss']
})
export class ReaderTypeComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  form: FormGroup;
  closeResult: string;
  readerTypes: [ReaderType];
  readerType: ReaderType = {} as ReaderType;

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService,
    private readerTypeService: ReaderTypeservice,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      bookLimit: [0, [Validators.required, Validators.min(0)]]
    });
    this.getAllReaderType();
  }

  getAllReaderType() {
    this.readerTypeService.all().subscribe(res => {
      this.readerTypes = res.data;
    });
  }

  hideModal() {
    this.editModal.hide();
  }

  submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  save() {
    if (this.form.valid) {
      const rdType = {
        ...this.form.value,
        idReaderType: this.readerType.idReaderType,
      };
      this.readerTypeService.save(rdType).subscribe(res => {
        if (res.errorCode === 0) {
          this.editModal.hide();
          this.getAllReaderType();
          this.readerType = {} as ReaderType;
          this.pnotifyService.success('Info', 'Save data successfully !');
        } else {
          this.pnotifyService.error('Error', 'Save data failed !');
        }
      });
    }
  }

  delete(id) {
    this.pnotifyService.showConfirm('Confirm', 'Are you really want to delete ?', yes => {
      if (yes) {
        this.readerTypeService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.getAllReaderType();
          }
        });
      }
    });
  }

  showAddModal() {
    this.form.reset();
    this.editModal.show();
  }

  showEditModal(id) {
    this.readerTypeService.get(id).subscribe(res => {
      this.readerType = res.data;
      this.form.controls['name'].setValue(this.readerType.name);
      this.form.controls['bookLimit'].setValue(this.readerType.bookLimit);
      this.editModal.show();
    });
  }

  dev() {
    alert('This function in stage of development !');
  }
}
