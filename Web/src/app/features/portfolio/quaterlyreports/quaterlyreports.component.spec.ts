import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlyreportsComponent } from './quaterlyreports.component';

describe('QuaterlyreportsComponent', () => {
  let component: QuaterlyreportsComponent;
  let fixture: ComponentFixture<QuaterlyreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaterlyreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaterlyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
