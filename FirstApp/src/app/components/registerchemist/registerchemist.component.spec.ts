import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterchemistComponent } from './registerchemist.component';

describe('RegisterchemistComponent', () => {
  let component: RegisterchemistComponent;
  let fixture: ComponentFixture<RegisterchemistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterchemistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterchemistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
