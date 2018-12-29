import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcCircuitComponent } from './calc-circuit.component';

describe('CalcCircuitComponent', () => {
  let component: CalcCircuitComponent;
  let fixture: ComponentFixture<CalcCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
