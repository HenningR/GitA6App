import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherplatformComponent } from './otherplatform.component';

describe('OtherplatformComponent', () => {
  let component: OtherplatformComponent;
  let fixture: ComponentFixture<OtherplatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherplatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherplatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
