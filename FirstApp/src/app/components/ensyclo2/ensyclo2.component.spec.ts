import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ensyclo2Component } from './ensyclo2.component';

describe('Ensyclo2Component', () => {
  let component: Ensyclo2Component;
  let fixture: ComponentFixture<Ensyclo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ensyclo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ensyclo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
