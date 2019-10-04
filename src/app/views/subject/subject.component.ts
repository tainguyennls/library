import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import readXlsxFile from 'read-excel-file';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  @ViewChild('importModal', { static: false }) importModal: ModalDirective;
  action: string;
  form: FormGroup;
  closeResult: string;
  subjects: [Subject];
  subject: Subject = {} as Subject;
  subjectImport: Subject[];

  constructor(
    private fb: FormBuilder,
    private pnotifyService: PnotifyService,
    private subService: SubjectService,
  ) {
    this.subjectImport = [];
  }

  ngOnInit() {
    this.getSubjects();
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

  getSubjects() {
    this.subService.all().subscribe(res => {
      this.subjects = res.data;
    });
  }

  save() {
    if (this.form.valid) {
      const userData = {
        ...this.form.value,
        idSubject: this.subject.idSubject
      };
      this.subService.save(userData).subscribe(res => {
        if (res.errorCode === 0) {
          if (this.action === 'Add') {
            this.pnotifyService.success('Info', 'A subject is saved into system.');
          } else {
            this.pnotifyService.success('Info', 'Subject updated.');
          }
          this.editModal.hide();
          this.getSubjects();
          this.subject = {} as Subject;
        } else {
          this.pnotifyService.error('Error', 'Error happened !');
        }
      });
    }
  }

  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you really want to delete ?', yes => {
      if (yes) {
        this.subService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Subject you choose removed.');
            this.getSubjects();
          } else {
            this.pnotifyService.error('Error', 'Error happened when remove subject !');
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
    this.subService.get(id).subscribe(res => {
      this.subject = res.data;
      this.form.controls['name'].setValue(this.subject.name);
      this.editModal.show();
    });
  }

  importSubjects() {
    this.action = 'Import';
    this.importModal.show();
  }

  hideImportModal() {
    this.importModal.hide();
  }

  dev() {
    alert('This function in stage of development !');
  }


  readExcel(event) {
    const file = event.target.files[0];
    if (file.name.endsWith('xlsx') || file.name.endsWith('xls')) {
      const schema = {
        'No': {
          prop: '#',
          type: String,
          required: false,
        },
        // 'Id': {
        //   prop: 'idSubject',
        //   type: String,
        //   required: true
        // },
        'Name': {
          prop: 'name',
          type: String,
          required: true
        }
      };
      readXlsxFile(file, { schema }).then(({ rows, errors }) => {
        if (errors.length) {
          this.pnotifyService.error('Error', 'Error happened when import file !');
        } else {
          this.subjectImport = [...this.subjectImport, ...rows];
        }
      });
    } else {
      this.pnotifyService.error('Error', 'Your file you chosen not right format !');
    }
  }

  resetImport() {
    this.subjectImport = [];
  }

  saveImport() {
    this.subService.import(this.subjectImport).subscribe(res => {
      if (res.errorCode === 0) {
        this.pnotifyService.success('Info', `${this.subjectImport.length} records imported to system !`);
        this.getSubjects();
        this.importModal.hide();
        this.resetImport();
      } else {
        this.pnotifyService.error('Error', 'Something went wrong !');
      }
    });
  }
}
