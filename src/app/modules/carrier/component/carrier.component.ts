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
import { NumberSymbol } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';
import { ConfirmationDialogComponent } from '../../shared/components/Dialogs/confirmation-dialog/confirmation-dialog.component';
import { NewConfirmationDialogComponent } from '../../shared/components/Dialogs/new-confirmation-dialog/new-confirmation-dialog.component';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {
  searchInputControl: FormControl = new FormControl('');
  dataSource = new MatTableDataSource<GetAllCarrierDto>();
  displayedColumns: string[] = ['carrierUniqueCode', 'fullName', 'email', 'phone', 'operations'];
  getUserFromAuthByDtoModel!:GetUserByRefreshTokenResponseDtoModel;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private carrierService: CarrierService, public dialog: MatDialog,private toastrService:ToastrService,private userService:UserService) {}

  ngOnInit(): void {
    this.getAllCarriers();
    this.getUserFromAuthByDto();
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
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
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

  openCarrierVehiclesDialog(carrierId: number) {
    const dialogRef = this.dialog.open(ShowCarrierVehiclesDialogComponent, {
      width: '600px',
      data: { carrierId: carrierId } // Diyalog'a carrierId'yi data olarak gönder
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

  deleteCarrierById(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      maxWidth:'50em',
      data:{
        title:'Emin misiniz?',
        content:'Bu Taşıyıcıyı silmek istediğinizden emin misiniz?'
      }
    });
    dialogRef.afterClosed().subscribe(
      (result)=> {
        try {
          if(result){
            this.carrierService.deleteCarrierById(id,this.getUserFromAuthByDtoModel.userId).subscribe(
              {
                next:(response)=>{
                  this.toastrService.success(response.message);
                },
                error:(error)=>{
                  this.toastrService.error(error);
                }
              }
            )
          }
        } catch (error) {
          console.log(error);  
        }

        
      }
    );
  }
  


  // inactivateSellerBySellerId(sellerId: number): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     maxWidth: '50em',
  //     data: {
  //       title: 'Emin Misiniz?',
  //       content: 'Bu satıcıyı silmek istediğinizden emin misiniz?',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.sellerService
  //         .inactivateSellerBySellerId(
  //           sellerId,
  //           this.getUserFromAuthByDtoModel.userId
  //         )
  //         .subscribe({
  //           next: (response) => {
  //             this.toastrService.success(response.message);
  //             this.getAll();
  //           },
  //           error: (httpErrorResponse) => {
  //             this.toastrService.error(httpErrorResponse.error.message);
  //           },
  //         });
  //     }
  //   });
  // }

  
}
