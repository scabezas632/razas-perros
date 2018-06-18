import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazasCRUDComponent } from './razas-crud.component';

describe('RazasCRUDComponent', () => {
  let component: RazasCRUDComponent;
  let fixture: ComponentFixture<RazasCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazasCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazasCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
