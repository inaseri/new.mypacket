import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTransactionComponent } from './change-transaction.component';

describe('ChangeTransactionComponent', () => {
  let component: ChangeTransactionComponent;
  let fixture: ComponentFixture<ChangeTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
