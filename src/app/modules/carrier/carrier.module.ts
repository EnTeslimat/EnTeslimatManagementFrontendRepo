import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrierRoutingModule } from './carrier-routing.module';
import { CarrierComponent } from './component/carrier.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomerRoutingModule } from '../customer/customer-routing.module';
import { AddCarrierDialogComponent } from './component/dialog-components/add-carrier-dialog/add-carrier-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { AddNewVehicleToCarrierDialogComponent } from './dialogs/add-new-vehicle-to-carrier-dialog/add-new-vehicle-to-carrier-dialog.component';
import { ShowCarrierVehiclesDialogComponent } from './dialogs/show-carrier-vehicles-dialog/show-carrier-vehicles-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedRoutingModule } from '../shared/shared-routing.module';

@NgModule({
  declarations: [CarrierComponent,AddCarrierDialogComponent, AddNewVehicleToCarrierDialogComponent, ShowCarrierVehiclesDialogComponent],
  imports: [  
    CommonModule,
    CarrierRoutingModule,
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
    MatProgressSpinnerModule,

    ],
})
export class CarrierModule {}
