import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlyCardComponent } from './quaterly-card.component';

describe('QuaterlyCardComponent', () => {
  let component: QuaterlyCardComponent;
  let fixture: ComponentFixture<QuaterlyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaterlyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaterlyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
