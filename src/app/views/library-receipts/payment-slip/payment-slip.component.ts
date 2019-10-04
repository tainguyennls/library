import { Component, OnInit, Output } from '@angular/core';
import { Book } from '../../../models/book';
import { LoanSlip } from '../../../models/loan-slip';
import { BookService } from '../../../services/book.service';
import { PnotifyService } from '../../../utils/pnotify.service';
import { LoanSlipService } from '../../../services/loan-slip.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-slip',
  templateUrl: './payment-slip.component.html',
  styleUrls: ['./payment-slip.component.scss']
})
export class PaymentSlipComponent implements OnInit {
  books: Book[];
  loanSlips: LoanSlip[];
  validateForm: FormGroup;
  count: number = 0;

  constructor(private fb: FormBuilder,
    private bookService: BookService,
    private pnotifyService: PnotifyService,
    private loanSlipService: LoanSlipService
  ) { }

  ngOnInit(): void {
    const obj = {
      id: 1,
      user: `4398355935`,
      librarian: `Teacher's guide`,
      dateBorrow: `	M.H. Newton , Greg Cossu , Aleda Krause`,
      dateReturn: `2019/09/28`,
      quantity: 1,
      status: `Return`,
    };
    this.loanSlips = this.loanSlips || [];
    // this.loanSlips.push(obj);
    this.books = [];

    this.validateForm = this.fb.group({
      user: [null, [Validators.required]],
      librarian: [null, [Validators.required]],
      borrowTime: [null, [Validators.required]],
      returnTime: [null, [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      status: [null, [Validators.required]],
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
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
      if (this.loanSlips.length > 0) {
        this.pnotifyService.success('Notifications', 'Add loan slip success');
        // console.log({ ...this.validateForm.value });
        const dataSave = {
          ...this.validateForm.value,
          books: this.loanSlips,
        };
        console.log('Data', JSON.stringify(dataSave));
        this.loanSlipService.addNewLoanSlip({ ...this.validateForm.value }).subscribe(res => {
          console.log('Res', res);
        });
        e.preventDefault();
        this.validateForm.reset();
        this.loanSlips = [];
      } else {
        this.pnotifyService.error('Notifications', 'Please add books before save');
      }
    }
  }

  searchByBarcode(event) {
    if (event.keyCode === 13) {
      const obj = {
        id: this.count++,
        user: `4398355935`,
        librarian: `Teacher's guide`,
        dateBorrow: `	M.H. Newton , Greg Cossu , Aleda Krause`,
        dateReturn: `2019/09/28`,
        quantity: 1,
        status: `Return`,
      };
      this.loanSlips = [...this.loanSlips];
      this.validateForm.controls['quantity'].setValue(this.loanSlips.length);
      event.target.value = '';
    }
  }
}
