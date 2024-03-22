import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVehicleToCarrierDialogComponent } from './add-new-vehicle-to-carrier-dialog.component';

describe('AddNewVehicleToCarrierDialogComponent', () => {
  let component: AddNewVehicleToCarrierDialogComponent;
  let fixture: ComponentFixture<AddNewVehicleToCarrierDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewVehicleToCarrierDialogComponent]
    });
    fixture = TestBed.createComponent(AddNewVehicleToCarrierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
