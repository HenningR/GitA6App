import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualFeesummaryCardComponent } from './annual-feesummary-card.component';

describe('AnnualFeesummaryCardComponent', () => {
  let component: AnnualFeesummaryCardComponent;
  let fixture: ComponentFixture<AnnualFeesummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualFeesummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualFeesummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
