import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfinalComponent } from './addfinal.component';

describe('AddfinalComponent', () => {
  let component: AddfinalComponent;
  let fixture: ComponentFixture<AddfinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
