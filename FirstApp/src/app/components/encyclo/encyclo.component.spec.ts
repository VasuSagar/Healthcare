import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncycloComponent } from './encyclo.component';

describe('EncycloComponent', () => {
  let component: EncycloComponent;
  let fixture: ComponentFixture<EncycloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncycloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncycloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
