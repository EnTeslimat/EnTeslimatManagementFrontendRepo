import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-detail-dialog',
  templateUrl: './delivery-detail-dialog.component.html',
  styleUrls: ['./delivery-detail-dialog.component.css']
})

export class DeliveryDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
