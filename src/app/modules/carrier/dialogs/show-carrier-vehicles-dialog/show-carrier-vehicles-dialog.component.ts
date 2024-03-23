import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CarrierVehiclesResponseDto } from 'src/app/modules/vehicle/models/carrier-vehicles-response-dto';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';

@Component({
  selector: 'app-show-carrier-vehicles-dialog',
  templateUrl: './show-carrier-vehicles-dialog.component.html',
  styleUrls: ['./show-carrier-vehicles-dialog.component.css']
})
export class ShowCarrierVehiclesDialogComponent implements OnInit {

  carrierVehicles:CarrierVehiclesResponseDto[]=[];

  constructor(private vehicleService:VehicleService,@Inject(MAT_DIALOG_DATA) public data: any,private toastrService:ToastrService){

  }
  ngOnInit(): void {

    this.getAllCarrierVehiclesByCarrierId();
  }

  getAllCarrierVehiclesByCarrierId(){
    this.vehicleService.getAllCarrierVehiclesByCarrierId(this.data.carrierId).subscribe(
      {
        next:(response)=>{
          console.log(response);
          this.carrierVehicles = response.data;
        },
        error:(error)=>{
          console.log("Error",error);
          this.toastrService.error(error.error);
        }
      }
    );
  }

}
