import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankToBankComponent } from './bank-to-bank.component';

describe('BankToBankComponent', () => {
  let component: BankToBankComponent;
  let fixture: ComponentFixture<BankToBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankToBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankToBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
