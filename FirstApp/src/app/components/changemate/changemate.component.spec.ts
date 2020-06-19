import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangemateComponent } from './changemate.component';

describe('ChangemateComponent', () => {
  let component: ChangemateComponent;
  let fixture: ComponentFixture<ChangemateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangemateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangemateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
