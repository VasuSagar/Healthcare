import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepriceComponent } from './changeprice.component';

describe('ChangepriceComponent', () => {
  let component: ChangepriceComponent;
  let fixture: ComponentFixture<ChangepriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
