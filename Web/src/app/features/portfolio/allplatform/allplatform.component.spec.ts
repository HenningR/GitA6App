import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllplatformComponent } from './allplatform.component';

describe('AllplatformComponent', () => {
  let component: AllplatformComponent;
  let fixture: ComponentFixture<AllplatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllplatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllplatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
