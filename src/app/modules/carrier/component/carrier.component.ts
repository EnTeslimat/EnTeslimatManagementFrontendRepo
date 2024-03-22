import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { GetAllCarrierDto } from '../models/get-all-carrier-dto';
import { CarrierService } from '../services/carrier.service';
import { AddCarrierDialogComponent } from './dialog-components/add-carrier-dialog/add-carrier-dialog.component';
import { AddNewVehicleToCarrierDialogComponent } from '../dialogs/add-new-vehicle-to-carrier-dialog/add-new-vehicle-to-carrier-dialog.component';
import { ShowCarrierVehiclesDialogComponent } from '../dialogs/show-carrier-vehicles-dialog/show-carrier-vehicles-dialog.component';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {
  searchInputControl: FormControl = new FormControl('');
  dataSource = new MatTableDataSource<GetAllCarrierDto>();
  displayedColumns: string[] = ['carrierUniqueCode', 'fullName', 'email', 'phone', 'operations'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private carrierService: CarrierService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCarriers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupSearch();
  }

  setupSearch() {
    this.searchInputControl.valueChanges.subscribe((searchValue: string) => {
      this.dataSource.filter = searchValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  getAllCarriers() {
    this.carrierService.getAllCarriers().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
      },
      error: (err) => {
        console.error('Carrier verileri alınırken bir hata oluştu:', err);
      }
    });
  }

  showVehicleDetails() {
    // TODO: Implement functionality to show vehicle details for a carrier
  }

  openCarrierAddDialog() {
    const dialogRef = this.dialog.open(AddCarrierDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCarriers();
      }
    });
  }

  openCarrierVehiclesDialog(){
    const dialogRef = this.dialog.open(ShowCarrierVehiclesDialogComponent,{
      width:'600px'
    });
  }
  announceSortChange(sortState: Sort) {
    // Advanced sorting functionality can be implemented here
    // Example: This function can be used with backend sorting support
  }

  openAddNewVehicleToCarrierDialog(carrierId: number) {
    this.dialog.open(AddNewVehicleToCarrierDialogComponent, {
      width: '600px',
      data: { carrierId: carrierId } // Dialog'a carrierId'yi gönder
    });
  }
}
