import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformCardComponent } from './platform-card.component';

describe('PlatformCardComponent', () => {
  let component: PlatformCardComponent;
  let fixture: ComponentFixture<PlatformCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
