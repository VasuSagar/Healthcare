import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicprofComponent } from './publicprof.component';

describe('PublicprofComponent', () => {
  let component: PublicprofComponent;
  let fixture: ComponentFixture<PublicprofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicprofComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
