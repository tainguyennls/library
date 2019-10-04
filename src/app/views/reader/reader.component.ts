import { Component, OnInit } from '@angular/core';
import { Reader } from '../../models/reader';
import { ReaderService } from '../../services/reader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  closeResult: string;
  readers: [Reader];
  reader: Reader;
  constructor(private readerService: ReaderService,
     private modalService: NgbModal, private routerService: Router,
      private route: ActivatedRoute, private pnotifyService: PnotifyService ) { }
    // route: lay tham so , routeService chuyen huong
  ngOnInit() {
    //
    this.reader = {idReader: 0} as Reader;
    this.loadDatas();
  }
  // load list
  loadDatas() {
    this.readerService.list().subscribe(res => {
      this.readers = res.data;
    });
  }
  // load a data
  loadData(id) {
    this.readerService.get(id).subscribe( res => {
      this.reader = res.data;
    });
  }
  // save
  save() {
    this.readerService.save(this.reader).subscribe(( res => {
      if (res.errorCode === 0) {
        this.modalService.dismissAll();
        this.loadDatas();
        this.reader = {} as Reader;
        this.pnotifyService.success('Info', 'Update susess');
      } else {
        this.pnotifyService.error('Info', 'Update failed 1');
      }
    }), err => {
      this.pnotifyService.error('Info', 'Update failed 2');
    });
  }

  // delete
  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.readerService.delete(id).subscribe( res => {
          if ( res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            const arow = this.readers.find(x => x.idReader === id);
            if (arow) {
              this.readers.splice(this.readers.findIndex(x => x.idReader === id), 1);
            }
          } else {
            if ( res.errorCode === 200) {
              this.pnotifyService.error('Info', 'Delete failed. Data is associated with other objects.');
            } else {
              this.pnotifyService.error('Info', 'Delete failed');
            }
          }
        });
      }
    });
  }

  open(content, id) {
    if (id !== 0) {
      this.loadData(id);
    } else {
      this.reader = {idReader: 0} as Reader;
    }
    this.modalService.open(content);
  }
}

