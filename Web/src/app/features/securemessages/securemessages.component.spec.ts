import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuremessagesComponent } from './securemessages.component';

describe('SecuremessagesComponent', () => {
  let component: SecuremessagesComponent;
  let fixture: ComponentFixture<SecuremessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuremessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuremessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
