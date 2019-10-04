import { Component, OnInit, ViewChild } from '@angular/core';
import { Librarian } from '../../models/librarian';
import { LibrarianService } from '../../services/librarian.service';
import { PnotifyService } from '../../utils/pnotify.service';
import { FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.scss']
})

export class LibrarianComponent implements OnInit {

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  action: string;
  form: FormGroup;
  closeResult: string;
  librarians: [Librarian];
  librarian: Librarian = {} as Librarian;

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService,
    private librarianService: LibrarianService,
  ) { }

  ngOnInit() {
    this.getAllLibrarian();
    this.form = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  getAllLibrarian() {
    this.librarianService.all().subscribe(res => {
      this.librarians = res.data;
    });
  }

  save() {
    if (this.form.valid) {
      const userData = {
        ...this.form.value,
        idLibrarian: this.librarian.idLibrarian
      };
      this.librarianService.save(userData).subscribe(res => {
        if (res.errorCode === 0) {
          if (this.action === 'Add') {
            this.pnotifyService.success('Info', 'A librarian is saved into system.');
          } else {
            this.pnotifyService.success('Info', 'Librarian updated.');
          }
          this.editModal.hide();
          this.getAllLibrarian();
          this.librarian = {} as Librarian;
        } else {
          this.pnotifyService.error('Error', 'Error happened !');
        }
      });
    }
  }

  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you really want to delete ?', yes => {
      if (yes) {
        this.librarianService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Librarian you choose removed.');
            this.getAllLibrarian();
          } else {
            this.pnotifyService.error('Error', 'Error happened when remove librarian !');
          }
        });
      }
    });
  }

  hideModal() {
    this.editModal.hide();
  }

  showAddModal() {
    this.action = 'Add';
    this.form.reset();
    this.editModal.show();
    this.form.controls['userName'].enable();
  }

  showEditModal(id) {
    this.action = 'Edit';
    this.librarianService.get(id).subscribe(res => {
      this.librarian = res.data;
      this.form.controls['userName'].disable();
      this.form.controls['userName'].setValue(this.librarian.userName);
      this.form.controls['fullName'].setValue(this.librarian.fullName);
      this.form.controls['email'].setValue(this.librarian.email);
      this.form.controls['phone'].setValue(this.librarian.phone);
      this.editModal.show();
    });
  }

  dev() {
    alert('This function in stage of development !');
  }
}
