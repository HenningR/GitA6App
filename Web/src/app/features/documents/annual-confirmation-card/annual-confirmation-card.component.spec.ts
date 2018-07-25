import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualConfirmationCardComponent } from './annual-confirmation-card.component';

describe('AnnualConfirmationCardComponent', () => {
  let component: AnnualConfirmationCardComponent;
  let fixture: ComponentFixture<AnnualConfirmationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualConfirmationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualConfirmationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
