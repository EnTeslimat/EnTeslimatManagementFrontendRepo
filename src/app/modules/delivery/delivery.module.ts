import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './component/delivery.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CustomerRoutingModule } from '../customer/customer-routing.module';
import { DeliveryStatusPipe } from './pipes/delivery-status.pipe';
import { DeliveryTypePipe } from './pipes/delivery-type.pipe';
import { DeliveryPackageTypePipe } from './pipes/delivery-package-type.pipe';
import { DeliveryDetailDialogComponent } from './dialogs/delivery-detail-dialog/delivery-detail-dialog.component';

@NgModule({
  declarations: [DeliveryComponent, DeliveryStatusPipe, DeliveryTypePipe, DeliveryPackageTypePipe, DeliveryDetailDialogComponent],
  imports: [CommonModule,
    CommonModule,
    DeliveryRoutingModule,
    RoutesContainerModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CustomerRoutingModule,
    MatOptionModule,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,],
})
export class DeliveryModule {}
