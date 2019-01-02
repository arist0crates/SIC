import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialFinishingPriceComponent } from './add-material-finishing-price.component';

describe('AddMaterialFinishingPriceComponent', () => {
  let component: AddMaterialFinishingPriceComponent;
  let fixture: ComponentFixture<AddMaterialFinishingPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialFinishingPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialFinishingPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
