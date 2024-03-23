import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfirmationDialogComponent } from './new-confirmation-dialog.component';

describe('NewConfirmationDialogComponent', () => {
  let component: NewConfirmationDialogComponent;
  let fixture: ComponentFixture<NewConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(NewConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
