import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfullComponent } from './viewfull.component';

describe('ViewfullComponent', () => {
  let component: ViewfullComponent;
  let fixture: ComponentFixture<ViewfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
