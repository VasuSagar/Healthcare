import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutprescriptionComponent } from './checkoutprescription.component';

describe('CheckoutprescriptionComponent', () => {
  let component: CheckoutprescriptionComponent;
  let fixture: ComponentFixture<CheckoutprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
