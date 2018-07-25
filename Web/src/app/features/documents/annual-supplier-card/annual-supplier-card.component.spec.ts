import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSupplierCardComponent } from './annual-supplier-card.component';

describe('AnnualSupplierCardComponent', () => {
  let component: AnnualSupplierCardComponent;
  let fixture: ComponentFixture<AnnualSupplierCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualSupplierCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualSupplierCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
