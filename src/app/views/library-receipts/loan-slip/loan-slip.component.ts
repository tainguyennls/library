import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { LoanSlip } from '../../../models/loan-slip';
import { LoanSlipService } from '../../../services/loan-slip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReaderService } from '../../../services/reader.service';
import { LibrarianService } from '../../../services/librarian.service';

@Component({
  selector: 'app-loan-slip',
  templateUrl: `./loan-slip.component.html`,
  styleUrls: ['./loan-slip.component.scss']
})
export class LoanSlipComponent implements OnInit {
  
  books: Book[];
  loanSlips: LoanSlip[];
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readerService: ReaderService,
    private loanSlipService: LoanSlipService,
    private librarianService: LibrarianService,
  ) { }

  ngOnInit(): void {

    this.loanSlips = [];
    this.getAllLoanSlip();

    this.validateForm = this.fb.group({
      user: [null, [Validators.required]],
      librarian: [null, [Validators.required]],
      borrowTime: [null, [Validators.required]],
      returnTime: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  dev(): void {
    alert('This function in stage of development !');
  }

  getAllLoanSlip() {
    this.loanSlipService.getAllLoanSlip().subscribe(res => {
      this.loanSlips = res.data;
      this.loanSlips.map(item =>  {
        item.dateBorrow = moment(item.dateBorrow).format('L');
        item.dateWillReturn = moment(item.dateWillReturn).format('L');
      });
    });
  }

  deleteLoanSlipById(id) {
    // this.
  }
}
