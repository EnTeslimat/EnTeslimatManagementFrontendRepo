import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehicleService } from '../services/vehicle.service';
import { GetAllVehiclesResponseDto } from '../models/get-all-vehicles-response-dto';
import { VehicleStatus } from '../enums/vehicle-status';
import { VehicleTypeEnum } from '../enums/vehicle-type-enum';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  searchInputControl: FormControl = new FormControl('');
  dataSource = new MatTableDataSource<GetAllVehiclesResponseDto>();
  displayedColumns: string[] = ['carrierFullName', 'brandName', 'modelName', 'vehicleType', 'vehicleStatus'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getAllVehicles();
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

  getAllVehicles() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
      },
      error: (err) => {
        console.error('Araç verileri alınırken bir hata oluştu:', err);
      }
    });
  }

  getVehicleStatusText(status: VehicleStatus): string {
    switch (status) {
      case VehicleStatus.Idle:
        return 'Boşta';
      case VehicleStatus.OnShift:
        return 'Vardiyada';
      default:
        return 'Bilinmiyor';
    }
  }

  getVehicleTypeText(type: VehicleTypeEnum): string {
    switch (type) {
      case VehicleTypeEnum.CargoVan:
        return 'Kargo Vanı';
      case VehicleTypeEnum.CargoTruck:
        return 'Kargo Kamyonu';
      default:
        return 'Bilinmiyor';
    }
  }
}
