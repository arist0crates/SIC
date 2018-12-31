import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrdersFactoriesComponent } from './assign-orders-factories.component';

describe('AssignOrdersFactoriesComponent', () => {
  let component: AssignOrdersFactoriesComponent;
  let fixture: ComponentFixture<AssignOrdersFactoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOrdersFactoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOrdersFactoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
