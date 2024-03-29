import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SellersService } from '../services/sellers.service';
import { UserService } from '../../user/services/user.service';
import { GetAllSellerResponseDto } from '../models/get-all-seller-response-dto';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';
import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { SellerAddressesDialogComponent } from '../../shared/components/Dialogs/Seller/seller-addresses-dialog/seller-addresses-dialog.component';
import { CreateSellerDialogComponent } from '../../shared/components/Dialogs/Seller/create-seller-dialog/create-seller-dialog.component';
import { ConfirmationDialogComponent } from '../../shared/components/Dialogs/confirmation-dialog/confirmation-dialog.component';
import { SellerCompanyTypeEnum } from '../models/enums/seller-company-type-enum';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit, AfterViewInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  searchInputControl: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<GetAllSellerResponseDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private sellerService: SellersService,
    private userService: UserService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<GetAllSellerResponseDto>();
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.getAll();
    this.setupFilter();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectorRef.detectChanges();
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
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
      this.getAll();
    });
  }
  getAll(): void {
    this.sellerService.getAll().subscribe({
      next: (response) => {
        this.dataSource.data = response.data.reverse();
        this.isLoaded = response.success;
        this.changeDetectorRef.detectChanges();
      },
      error: (httpErrorResponse) => {
        this.toastrService.error(httpErrorResponse.error.message);
      },
    });
  }
  openCreateSellerDialog(): void {
    const dialogRef = this.dialog.open(CreateSellerDialogComponent, {
      maxWidth: '50em',
    });
  }
  openAddressesDialog(seller: GetAllSellerResponseDto): void {
    const dialogRef = this.dialog.open(SellerAddressesDialogComponent, {
      maxWidth: '50em',
      data: { seller },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAll();
      }
    });
  }
  activateSellerBySellerId(sellerId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '50em',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu satıcıyı aktifleştirmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sellerService.activateSellerBySellerId(sellerId).subscribe({
          next: (response) => {
            this.toastrService.success(response.message);
            this.getAll();
          },
          error: (httpErrorResponse) => {
            this.toastrService.error(httpErrorResponse.error.message);
          },
        });
      }
    });
  }
  inactivateSellerBySellerId(sellerId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '50em',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu satıcıyı silmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sellerService
          .inactivateSellerBySellerId(
            sellerId,
            this.getUserFromAuthByDtoModel.userId
          )
          .subscribe({
            next: (response) => {
              this.toastrService.success(response.message);
              this.getAll();
            },
            error: (httpErrorResponse) => {
              this.toastrService.error(httpErrorResponse.error.message);
            },
          });
      }
    });
  }
  formatCreatedTime(createdTime: Date | null): string {
    return this.datePipe.transform(createdTime, 'dd.MM.yyyy HH:mm') || '';
  }
  mapSellerCompanyTypeEnum(status: SellerCompanyTypeEnum): string {
    switch (status) {
      case SellerCompanyTypeEnum.Limited:
        return 'Limited Şirketi';
      case SellerCompanyTypeEnum.Incorporated:
        return 'Şahıs Mülkiyeti Şirketi';
      case SellerCompanyTypeEnum.SoleProprietorship:
        return 'Anonim Şirket';
      default:
        return 'Bilinmeyen Durum';
    }
  }
  getSellerCompanyTypeEnumBg(status: SellerCompanyTypeEnum): string {
    switch (status) {
      case SellerCompanyTypeEnum.Limited:
        return '#fde047';
      case SellerCompanyTypeEnum.Incorporated:
        return '#d9f99d';
      case SellerCompanyTypeEnum.SoleProprietorship:
        return '#86efac';
      default:
        return '#f3f4f6';
    }
  }
  getSellerCompanyTypeEnumColor(status: SellerCompanyTypeEnum): string {
    switch (status) {
      case SellerCompanyTypeEnum.Limited:
        return '#854d0e';
      case SellerCompanyTypeEnum.Incorporated:
        return '#3f6212';
      case SellerCompanyTypeEnum.SoleProprietorship:
        return '#14532d';
      default:
        return '#4b5563';
    }
  }
  mapEntityStatus(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'Aktif Satıcı';
      case EntityStatuses.inactive:
        return 'Pasif Satıcı';
      default:
        return 'Bilinmeyen Satıcı Tipi';
    }
  }
  getColor(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgb(34 197 94)';
      case EntityStatuses.inactive:
        return 'red';
      default:
        return 'Bilinmeyen Satıcı Tipi';
    }
  }
  getBg(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgba(34, 197, 94, 0.2)';
      case EntityStatuses.inactive:
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'Bilinmeyen Satıcı Tipi';
    }
  }
}
