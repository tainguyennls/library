import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-slip-detail',
  templateUrl: './loan-slip-detail.component.html',
  styleUrls: ['./loan-slip-detail.component.scss']
})
export class LoanSlipDetailComponent implements OnInit {
  editCache: { [key: string]: any } = {};
  listOfData: any[] = [];
  isVisible = false;
  validateForm: FormGroup;
  receipt = {
    user: 'Nguyễn Thị Vân Thanh',
    librarian: 'Trần Thanh Tú',
    borrowTime: '2019/09/09 - 2019/12/12',
    returnTime: '2019/12/12',
    quantity: 12,
    status: 'Returned'
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    for (let i = 0; i < 50; i++) {
      this.listOfData.push({
        id: `${i}`,
        user: `978-962-00-5292-7`,
        librarian: `Teacher's guide (New edition)`,
        dateBorrow: `	M.H. Newton , Greg Cossu , Aleda Krause`,
        dateReturn: `2019/09/28`,
        quantity: `${i}`,
        status: `Return`,
      });
    }

    this.validateForm = this.fb.group({
      user: [null, [Validators.required]],
      librarian: [null, [Validators.required]],
      borrowTime: [null, [Validators.required]],
      returnTime: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  dev(): void {
    alert('This function in stage of development !');
  }

  // onPreview(part): void {
  //   var divElements = document.getElementById(part).innerHTML;
  //   var oldPage = document.body.innerHTML;
  //   document.body.innerHTML =
  //     "<html><head><title></title></head><body>" +
  //     divElements + "</body>";

  //   window.print();
  //   document.body.innerHTML = oldPage;
  // }
}





