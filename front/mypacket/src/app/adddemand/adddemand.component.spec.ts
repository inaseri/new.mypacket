import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddemandComponent } from './adddemand.component';

describe('AdddemandComponent', () => {
  let component: AdddemandComponent;
  let fixture: ComponentFixture<AdddemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
