import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  action: string;
  form: FormGroup;
  authors: [Author];
  author: Author = {} as Author;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private pnotifyService: PnotifyService,
  ) { }

  ngOnInit() {
    this.getAuthors();
    this.form = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  getAuthors() {
    this.authorService.all().subscribe(res => {
      this.authors = res.data;
    });
  }

  save() {
    if (this.form.valid) {
      const userData = {
        ...this.form.value,
        idAuthor: this.author.idAuthor,
      };
      this.authorService.save(userData).subscribe(res => {
        if (res.errorCode === 0) {
          if (this.action === 'Add') {
            this.pnotifyService.success('Info', 'A author is saved into system.');
          } else {
            this.pnotifyService.success('Info', 'Author updated.');
          }
          this.editModal.hide();
          this.getAuthors();
          this.author = {} as Author;
        } else {
          this.pnotifyService.error('Error', 'Error happened !');
        }
      });
    }
  }

  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you really want to delete ?', yes => {
      if (yes) {
        this.authorService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Author you choose removed.');
            this.getAuthors();
          } else {
            this.pnotifyService.error('Error', 'Error happened when remove author !');
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
  }

  showEditModal(id) {
    this.action = 'Edit';
    this.authorService.get(id).subscribe(res => {
      this.author = res.data;
      this.form.controls['name'].setValue(this.author.name);
      this.editModal.show();
    });
  }

  dev() {
    alert('This function in stage of development !');
  }

}

