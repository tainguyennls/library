import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import readXlsxFile from 'read-excel-file';
import { Author } from '../../models/author';
import { Subject } from '../../models/subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PnotifyService } from '../../utils/pnotify.service';
import { UploadService } from '../../services/upload.service';
import { AuthorService } from '../../services/author.service';
import { SubjectService } from '../../services/subject.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-title',
  templateUrl: './book-title.component.html',
  styleUrls: ['./book-title.component.scss']
})
export class BookTitleComponent implements OnInit {

  form: FormGroup;
  localUrl: any;
  localPhoto: File;

  photoChosen: string;
  authors: Author[];
  subjects: Subject[];

  authorChosen: string;
  subjectChosen: string;

  authorsAPIData: Author[];
  subjectsAPIData: Subject[];

  authorsFiltered: Author[];
  subjectsFiltered: Subject[];
  booksToUpload: Book[];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private uploadService: UploadService,
    private pnotifyService: PnotifyService,
    private subjectService: SubjectService,
  ) {

    this.authors = [];
    this.subjects = [];
    this.booksToUpload = [];
    this.localPhoto = null;
    this.photoChosen = null;
    this.authorsAPIData = [];
    this.subjectsAPIData = [];
  }

  ngOnInit() {

    this.getAllAuthor();
    
    this.form = this.fb.group({
      title: [null, Validators.required],
      edition: [null, Validators.required],
      pages: [null, Validators.required],
      size: [null, Validators.required],
      publishingInfo: [null, Validators.required],
      callNumber: [null, Validators.required],
      ISBN: [null, Validators.required],
      yearPublish: [null, Validators.required],
      authors: [null],
      subjects: [null],
      description: [null, Validators.required],
    });
  }

  getLibrarian() {
    // Get Librarian from cookie or local storage ....
  }

  getAllAuthor() {
    this.authorService.all().subscribe(res => {
      this.authorsAPIData = res.data;
      console.log(res.data);
      this.authorsFiltered = this.authorsAPIData;
    });
  }

  getAllSubject() {
    this.subjectService.all().subscribe(res => {
      this.subjectsAPIData = res.data;
      this.subjectsFiltered = this.subjectsAPIData;
    });
  }

  pushBookTitle() {
    this.uploadService.upload(this.localPhoto, this.saveBookTitle);
  }

  saveBookTitle(photoName) {
    // if (this.form.valid) {
    const userData = {
      // ...this.form.value,
      photo: photoName,
      // getRequest(),
    };
    console.log(userData);
    // } else {
    // this.pnotifyService.error('Error', 'Error when upload photo !');
    // }
  }

  getRequest() {
    return {
      authors: this.authors,
      subjects: this.subjects,
      books: this.booksToUpload,
    };
  }

  dev() {
    alert('This function in stage of development !');
  }

  removeAuthor(id: string) {
    this.authors = this.authors.filter(author => author.idAuthor !== id);
  }

  removeSubject(id: string) {
    this.subjects = this.subjects.filter(subject => subject.idSubject !== id);
  }

  searchAuthor(name: string) {
    this.authorsFiltered = this.authorsAPIData.filter(author => author.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  searchSubject(name: string) {
    this.subjectsFiltered = this.subjectsAPIData.filter(subject => subject.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  addAuthor(id: string) {
    this.authorsAPIData.forEach(auth => {
      if (auth.idAuthor === id) {
        let count = 0;
        this.authors.forEach(tmp => {
          if (tmp.idAuthor !== id) {
            count++;
          }
        });
        if (count === this.authors.length) {
          this.authors = [...this.authors, auth];
        }
      }
    });
    this.authorChosen = null;
  }

  addSubject(id: string) {
    this.subjectsAPIData.forEach(sub => {
      if (sub.idSubject === id) {
        let count = 0;
        this.subjects.forEach(tmp => {
          if (tmp.idSubject !== id) {
            count++;
          }
        });
        if (count === this.subjects.length) {
          this.subjects = [...this.subjects, sub];
        }
      }
    });
    this.subjectChosen = null;
  }

  submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  changePhoto(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.localPhoto = file;
      this.photoChosen = URL.createObjectURL(file);
      this.pnotifyService.success('Info', `${file.name} chosen !`);
    } else {
      this.pnotifyService.error('Error', `Error hapenned when upload photo ${this.photoChosen}`);
    }
  }

  importBook(event) {
    const file = event.target.files[0];
    if (file.name.endsWith('xlsx') || file.name.endsWith('xls')) {
      const schema = {
        'No': {
          prop: '#',
          type: String,
          required: false,
        },
        'LibCode': {
          prop: 'libCode',
          type: String,
          required: true
        },
        'Barcode': {
          prop: 'idBook',
          type: String,
          required: true
        },
        'Status': {
          prop: 'status',
          type: String,
          required: true
        },
      };
      readXlsxFile(file, { schema }).then(({ rows, errors }) => {
        if (errors.length) {
          this.pnotifyService.error('Error', 'Error happened when import file !');
        } else {
          this.booksToUpload = [...this.booksToUpload, ...rows];
          this.pnotifyService.success('Info', `${this.booksToUpload.length} records are imported.`);
        }
      });
    } else {
      this.pnotifyService.error('Error', 'Your file you chosen not right format !');
    }
  }

  deleteBookUpload(id) {
    this.booksToUpload = this.booksToUpload.filter(book => book.idBook !== id);
  }

  resetBookImported() {
    this.booksToUpload = [];
  }
}
