import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanSlip } from '../../../../models/loan-slip';
import { PnotifyService } from '../../../../utils/pnotify.service';
import { LoanSlipService } from '../../../../services/loan-slip.service';
import { BooksDetailService } from '../../../../services/book-detail.service';
import { BooksDetail } from '../../../../models/book-detail';
import { Librarian } from '../../../../models/librarian';
import { LibrarianService } from '../../../../services/librarian.service';

@Component({
  selector: 'app-add-loan-slip',
  templateUrl: './add-loan-slip.component.html',
  styleUrls: ['./add-loan-slip.component.scss']
})

export class AddLoanSlipComponent implements OnInit {
  loanSlip: LoanSlip;
  books: BooksDetail[];
  librarians: Librarian[];
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService,
    private loanSlipService: LoanSlipService,
    private bookDetailService: BooksDetailService,
    private librarianService: LibrarianService,
  ) { }

  ngOnInit(): void {
    this.books = [];
    this.librarians = [];
    this.loanSlip = {} as LoanSlip;

    this.librarianService.all().subscribe( res => {
      this.librarians = res.data;
    });

    this.validateForm = this.fb.group({
      user: [null, [Validators.required]],
      librarian: [null, [Validators.required]],
      borrowTime: [null, [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      status: [null, [Validators.required]],
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    this.books = [];
    this.validateForm.controls['quantity'].setValue(0);
    // tslint:disable-next-line:forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  save(e: MouseEvent) {
    if (this.validateForm.valid) {
      if (this.books.length > 0) {
        const userData = {
          ...this.validateForm.value,
          books: this.books,
        };
        console.log(userData);
        this.loanSlipService.addNewLoanSlip(userData).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Notifications', 'Save loan slip success');
            e.preventDefault();
            this.validateForm.reset();
            this.books = [];
            this.validateForm.controls['quantity'].setValue(0);
          } else {
            this.pnotifyService.error('Notifications', 'Save loan slip fail !');
          }
        });
      } else {
        this.pnotifyService.error('Notifications', 'Please add books before save');
      }
    }
  }

  searchByBarcode(event) {
    if (event.keyCode === 13) {
      this.bookDetailService.getBookAndBookTitleBaseId(event.target.value).subscribe(res => {
        if (res.errorCode === 0) {
          this.books = [...this.books, res.data];
          this.validateForm.controls['quantity'].setValue(this.books.length);
        }
        event.target.value = '';
      });
    }
  }

  deleteBook(id) {
    this.books = this.books.filter(item => item.book.idBook !== id);
    this.validateForm.controls['quantity'].setValue(this.books.length);
  }
}

