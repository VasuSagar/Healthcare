import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpreforpatientComponent } from './viewpreforpatient.component';

describe('ViewpreforpatientComponent', () => {
  let component: ViewpreforpatientComponent;
  let fixture: ComponentFixture<ViewpreforpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpreforpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpreforpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
