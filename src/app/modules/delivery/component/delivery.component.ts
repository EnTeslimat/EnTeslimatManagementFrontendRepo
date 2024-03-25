import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { GetAllSellerResponseDto } from '../../seller/models/get-all-seller-response-dto';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveryService } from '../services/delivery.service';
import { GetAllDeliveriesForManagementResponseDto } from '../models/get-all-deliveries-for-management-response-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  listOfGetAllDeliveriesForManagemenResponseDto:GetAllDeliveriesForManagementResponseDto[]=[]
  dataSource!: MatTableDataSource<GetAllSellerResponseDto>;

  searchInputControl: FormControl = new FormControl('');
  private _liveAnnouncer!: LiveAnnouncer;

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

  getAllDeliveriesForManagement(){
    this.deliveryService.getAllDeliveriesForManagement().subscribe(
      {
        next: (response)=>{
          this.listOfGetAllDeliveriesForManagemenResponseDto = response.data
        },
        error:(error)=>{
          this.toastrService.error(error.error)
        }

      }
    )
  }
}
