import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualreportComponent } from './annualreport.component';

describe('AnnualreportComponent', () => {
  let component: AnnualreportComponent;
  let fixture: ComponentFixture<AnnualreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
