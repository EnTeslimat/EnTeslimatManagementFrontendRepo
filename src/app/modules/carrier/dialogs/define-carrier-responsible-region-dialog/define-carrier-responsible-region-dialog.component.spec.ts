import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineCarrierResponsibleRegionDialogComponent } from './define-carrier-responsible-region-dialog.component';

describe('DefineCarrierResponsibleRegionDialogComponent', () => {
  let component: DefineCarrierResponsibleRegionDialogComponent;
  let fixture: ComponentFixture<DefineCarrierResponsibleRegionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefineCarrierResponsibleRegionDialogComponent]
    });
    fixture = TestBed.createComponent(DefineCarrierResponsibleRegionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
