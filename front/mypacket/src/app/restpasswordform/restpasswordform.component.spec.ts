import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestpasswordformComponent } from './restpasswordform.component';

describe('RestpasswordformComponent', () => {
  let component: RestpasswordformComponent;
  let fixture: ComponentFixture<RestpasswordformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestpasswordformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestpasswordformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
