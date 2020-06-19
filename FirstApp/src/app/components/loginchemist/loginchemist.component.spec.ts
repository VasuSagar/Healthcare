import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginchemistComponent } from './loginchemist.component';

describe('LoginchemistComponent', () => {
  let component: LoginchemistComponent;
  let fixture: ComponentFixture<LoginchemistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginchemistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginchemistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
