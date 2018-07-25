import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitadelplatformComponent } from './citadelplatform.component';

describe('CitadelplatformComponent', () => {
  let component: CitadelplatformComponent;
  let fixture: ComponentFixture<CitadelplatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitadelplatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitadelplatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
