import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbankComponent } from './abank.component';

describe('AbankComponent', () => {
  let component: AbankComponent;
  let fixture: ComponentFixture<AbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
