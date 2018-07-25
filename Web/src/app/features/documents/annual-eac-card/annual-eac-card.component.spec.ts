import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualEacCardComponent } from './annual-eac-card.component';

describe('AnnualEacCardComponent', () => {
  let component: AnnualEacCardComponent;
  let fixture: ComponentFixture<AnnualEacCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualEacCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualEacCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
