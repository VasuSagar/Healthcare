import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelblogComponent } from './delblog.component';

describe('DelblogComponent', () => {
  let component: DelblogComponent;
  let fixture: ComponentFixture<DelblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
