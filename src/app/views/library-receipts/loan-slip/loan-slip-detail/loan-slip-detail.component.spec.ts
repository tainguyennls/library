import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSlipDetailComponent } from './loan-slip-detail.component';

describe('LoanSlipDetailComponent', () => {
  let component: LoanSlipDetailComponent;
  let fixture: ComponentFixture<LoanSlipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSlipDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSlipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
