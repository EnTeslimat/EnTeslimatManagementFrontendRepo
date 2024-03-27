import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDetailDialogComponent } from './delivery-detail-dialog.component';

describe('DeliveryDetailDialogComponent', () => {
  let component: DeliveryDetailDialogComponent;
  let fixture: ComponentFixture<DeliveryDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryDetailDialogComponent]
    });
    fixture = TestBed.createComponent(DeliveryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
