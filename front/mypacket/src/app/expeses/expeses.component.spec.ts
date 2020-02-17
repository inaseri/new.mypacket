import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpesesComponent } from './expeses.component';

describe('ExpesesComponent', () => {
  let component: ExpesesComponent;
  let fixture: ComponentFixture<ExpesesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpesesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
