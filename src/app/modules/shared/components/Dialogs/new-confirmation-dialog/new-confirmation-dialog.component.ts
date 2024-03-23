import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-confirmation-dialog',
  templateUrl: './new-confirmation-dialog.component.html',
  styleUrls: ['./new-confirmation-dialog.component.css']
})
export class NewConfirmationDialogComponent {

  public message: string;

  constructor(
    public dialogRef: MatDialogRef<NewConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data.message;
  }

  onConfirm(): void {
    // Onay butonuna tıklandığında çağrılır
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // İptal butonuna tıklandığında çağrılır
    this.dialogRef.close(false);
  }
}
