import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { GetAllSellerResponseDto } from '../../seller/models/get-all-seller-response-dto';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryService } from '../services/delivery.service';
import { GetAllDeliveriesForManagementResponseDto } from '../models/get-all-deliveries-for-management-response-dto';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  ngOnInit(): void {
    this.getAllDeliveriesForManagement();
    this.setupFilter();
    
    }
  displayedColumns: string[] = ['receiverFullName','sellerBatchBarcode','packageBarcode','collectorCarrierName', 'distributorCarrierName', 'createdTime','cityName','districtName','neighbourhoodName','fullAddress',];

  listOfGetAllDeliveriesForManagemenResponseDto:GetAllDeliveriesForManagementResponseDto[]=[]
  dataSource = new MatTableDataSource<GetAllDeliveriesForManagementResponseDto>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  searchInputControl: FormControl = new FormControl('');
  private _liveAnnouncer!: LiveAnnouncer;
  isExpansionDetailRow = (index: number, row: Object) => row.hasOwnProperty('detailRow');

  constructor(private deliveryService:DeliveryService,private toastrService:ToastrService){

  }
  setupFilter(): void {
    this.searchInputControl.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        map((value) => (typeof value === 'string' ? value : ''))
      )
      .subscribe((value) => {
        this.applyFilter(value);
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAllDeliveriesForManagement() {
    this.deliveryService.getAllDeliveriesForManagement().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
