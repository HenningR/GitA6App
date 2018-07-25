import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyvaultComponent } from './myvault.component';

describe('MyvaultComponent', () => {
  let component: MyvaultComponent;
  let fixture: ComponentFixture<MyvaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyvaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyvaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
