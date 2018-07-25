import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverificationCardComponent } from './otpverification-card.component';

describe('OtpverificationCardComponent', () => {
  let component: OtpverificationCardComponent;
  let fixture: ComponentFixture<OtpverificationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpverificationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpverificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
