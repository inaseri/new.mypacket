import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbanksComponent } from './lbanks.component';

describe('LbanksComponent', () => {
  let component: LbanksComponent;
  let fixture: ComponentFixture<LbanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
