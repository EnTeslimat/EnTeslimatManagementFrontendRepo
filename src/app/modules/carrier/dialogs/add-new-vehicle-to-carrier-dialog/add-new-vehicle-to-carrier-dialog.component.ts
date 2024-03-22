import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { VehicleTypeEnum } from '../../enums/vehicle-type';
import { FuelTypeEnum } from '../../enums/fuel-type-enum';
import { VehicleBrand } from 'src/app/modules/vehicle/models/vehicle-brand';
import { VehicleBrandService } from 'src/app/modules/vehicle/services/vehicle-brand.service';
import { VehicleModelService } from 'src/app/modules/vehicle/services/vehicle-model.service';
import { VehicleModel } from 'src/app/modules/vehicle/models/vehicle-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateVehicleRequestDto } from '../../models/create-vehicle-request-dto';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-add-new-vehicle-to-carrier-dialog',
  templateUrl: './add-new-vehicle-to-carrier-dialog.component.html',
  styleUrls: ['./add-new-vehicle-to-carrier-dialog.component.css']
})
export class AddNewVehicleToCarrierDialogComponent implements OnInit {
  getUserFromAuthByDtoModel!: GetUserByRefreshTokenResponseDtoModel;

  carrierId!: number;
  addVehicleForm!: FormGroup;
  vehicleBrands:VehicleBrand[]=[];
  vehicleModels: VehicleModel[] = []; 
  vehicleTypes = [
    { value: VehicleTypeEnum.CargoVan, label: 'Hafif Ticari (Van)' },
    { value: VehicleTypeEnum.CargoTruck, label: 'Ağır Ticari (Tır)' }
  ];

  fuelTypes = [
    {
      value: FuelTypeEnum.Diesel, label:'Dizel',
      
    },
    {
      value:FuelTypeEnum.Gasoline,label:'Benzinli'
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private vehicleBrandService:VehicleBrandService,
    private vehicleModelService:VehicleModelService,
    private toastrService: ToastrService,
    private userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllVehicleBrands();
    this.getUserFromAuthByDto();
    this.carrierId=this.data.carrierId;
  }

  initializeForm(): void {
    this.addVehicleForm = this.formBuilder.group({
      
      vehicleType: [null, Validators.required],
      identityPlateNumber: ['', Validators.required],
      weightCapacity: [null, Validators.required],
      dateOfEntryTimeIntoTraffic: ['', Validators.required],
      fuelType: [null, Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
      vehicleBrand: [null, Validators.required],
      vehicleModel: [null, Validators.required],
      motorChassisNumber: ['', Validators.required],
      lastMaintenanceDate: [null] // Bu alan opsiyonel
    });
  }

  addNewVehicleToCarrier(): void {
    console.log('addNewVehicleToCarrier function triggered');

      if (this.addVehicleForm.invalid) {
        this.toastrService.error('Please fill in all required fields.');
        return;
      }
      console.log('DTO oluşturuluyor...');
      try {
        const formValue = this.addVehicleForm.value;

        // İhtiyaç duyulan formatlamayı yap (eğer herhangi bir formatlama ihtiyacınız varsa)
    const dateOfEntryTimeIntoTraffic = formValue.dateOfEntryTimeIntoTraffic ? formValue.dateOfEntryTimeIntoTraffic.toISOString().split('T')[0] : null;
    const lastMaintenanceDate = formValue.lastMaintenanceDate ? formValue.lastMaintenanceDate.toISOString().split('T')[0] : null;

    // DTO'yu form değerlerine göre oluştur
    const createVehicleRequestDto = {
      carrierId: this.carrierId,
      createdById: this.getUserFromAuthByDtoModel.userId,
      vehicleType: formValue.vehicleType,
      identityPlateNumber: formValue.identityPlateNumber,
      weightCapacity: formValue.weightCapacity,
      dateOfEntryTimeIntoTraffic: dateOfEntryTimeIntoTraffic,
      fuelType: formValue.fuelType,
      length: formValue.length,
      width: formValue.width,
      height: formValue.height,
      vehicleBrandId: formValue.vehicleBrand,
      vehicleModelId: formValue.vehicleModel,
      motorChassisNumber: formValue.motorChassisNumber, // Corrected the field name here
      lastMaintenanceDate: lastMaintenanceDate,
    };

    

        this.vehicleService.addVehicleToCarrier(createVehicleRequestDto).subscribe({
          next:(response)=>{
            this.toastrService.success(response.message);
          },
          error:(error)=>{
            console.log(error)
            this.toastrService.error(error.error.message);
          }
        })
      } catch (error) {
        this.toastrService.error('DTO oluşturma sırasında bir hata meydana geldi: '+ error);
      }
     

    
  }

  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
    });
  }

  getAllVehicleBrands(){
    this.vehicleBrandService.getAllVehicleBrands().subscribe(
      {
        next:(response)=> {
          this.vehicleBrands = response.data
        },
        error:(errorResponse)=> {
          this.toastrService.error(errorResponse.message);
        }
      }
    )
  }
  onBrandSelect(event: any) {
    const brandId = event.value;
    this.getAllVehicleModelsByBrandId(brandId);
  }

  getAllVehicleModelsByBrandId(brandId: number) {
    this.vehicleModelService.getAllVehicleModelsByBrandId(brandId).subscribe({
      next: (response) => {
        this.vehicleModels = response.data;
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.message);
      }
    });
  }
}
