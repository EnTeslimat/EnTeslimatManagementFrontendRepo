import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCarrierVehiclesDialogComponent } from './show-carrier-vehicles-dialog.component';

describe('ShowCarrierVehiclesDialogComponent', () => {
  let component: ShowCarrierVehiclesDialogComponent;
  let fixture: ComponentFixture<ShowCarrierVehiclesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCarrierVehiclesDialogComponent]
    });
    fixture = TestBed.createComponent(ShowCarrierVehiclesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
