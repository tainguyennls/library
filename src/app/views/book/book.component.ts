import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Book } from '../../models/book';

import { PnotifyService } from '../../utils/pnotify.service';
import { BookService } from '../../services/book.service';
import { BookTitle } from '../../models/book-title';
import { BookTitleService } from '../../services/book-title.service';
import { Librarian } from '../../models/librarian';
import { LibrarianService } from '../../services/librarian.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  action: string;
  form: FormGroup;
  closeResult: string;
  books: [Book];
  book: Book = {} as Book;
  bookTitles: [BookTitle];
  librarians: [Librarian];

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService,
    private bookService: BookService,
    private bookTitleService: BookTitleService,
    private libService: LibrarianService
  ) {
    this.bookTitleService.all().subscribe(res => {
      this.bookTitles = res.data;
      console.log(res);
    });

    // this.libService.all().subscribe(res => {
    //   this.librarians = res.data;
    // });
   }

  ngOnInit() {
    this.getBooks();
    this.form = this.fb.group({
      idBookTitle: [null, [Validators.required]],
      dateImport: [null, [Validators.required]],
      status: [null, [Validators.required]],

    });
  }

  submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  getBooks() {
    this.bookService.list().subscribe(res => {
      this.books = res.data;
    });
  }

  save() {
    if (this.form.valid) {
      const userData = {
        ...this.form.value,
        idBook: this.book.idBook
      };
      this.bookService.save(userData).subscribe(res => {
        if (res.errorCode === 0) {
          if (this.action === 'Add') {
            this.pnotifyService.success('Info', 'A book is saved into system.');
          } else {
            this.pnotifyService.success('Info', 'Book updated.');
          }
          this.editModal.hide();
          this.getBooks();
          this.book = {} as Book;
        } else {
          this.pnotifyService.error('Error', 'Error happened !');
        }
      });
    }
  }

  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you really want to delete ?', yes => {
      if (yes) {
        this.bookService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Book you choose removed.');
            this.getBooks();
          } else {
            this.pnotifyService.error('Error', 'Error happened when remove book !');
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
    this.bookService.get(id).subscribe(res => {
      this.book = res.data;
      this.editModal.show();
    });
  }

  dev() {
    alert('This function in stage of development !');
  }

}
