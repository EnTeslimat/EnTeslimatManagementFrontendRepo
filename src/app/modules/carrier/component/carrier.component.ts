import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetAllCarrierDto } from '../models/get-all-carrier-dto';
import { CarrierService } from '../services/carrier.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AddCarrierDialogComponent } from './dialog-components/add-carrier-dialog/add-carrier-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {
  searchInputControl: FormControl = new FormControl('');
  dataSource = new MatTableDataSource<GetAllCarrierDto>();
  displayedColumns: string[] = ['carrierUniqueCode', 'fullName', 'email', 'phone','operations'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private carrierService: CarrierService,public dialog: MatDialog) {}

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

  showVehicleDetails(){

  }

  openCarrierAddDialog(){
    const dialogRef = this.dialog.open(AddCarrierDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getAllCarriers();
      }
    })
  }

  announceSortChange(sortState: Sort) {
    // Gelişmiş sıralama işlevselliği için kullanılabilir
    // Örnek: Bu fonksiyon, backend sıralama desteğiyle kullanılabilir
  }
}
