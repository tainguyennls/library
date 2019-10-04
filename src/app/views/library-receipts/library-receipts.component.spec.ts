import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryReceiptsComponent } from './library-receipts.component';

describe('LibraryReceiptsComponent', () => {
  let component: LibraryReceiptsComponent;
  let fixture: ComponentFixture<LibraryReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
