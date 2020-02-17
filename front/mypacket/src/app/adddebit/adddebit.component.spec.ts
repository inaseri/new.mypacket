import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddebitComponent } from './adddebit.component';

describe('AdddebitComponent', () => {
  let component: AdddebitComponent;
  let fixture: ComponentFixture<AdddebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
