import { Component, Inject, OnInit } from '@angular/core';
import { CarrierService } from '../../services/carrier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/modules/shared/city/models/city';
import { District } from 'src/app/modules/shared/district/models/district';
import { Neighbourhood } from 'src/app/modules/shared/neighbourhood/models/neighbourhood';
import { CityService } from 'src/app/modules/shared/city/services/city.service';
import { DistrictService } from 'src/app/modules/shared/district/services/district.service';
import { NeighbourhoodService } from 'src/app/modules/shared/neighbourhood/services/neighbourhood.service';
import { DefineResponsibleRegionToCarrierRequestDto } from '../../models/define-responsible-region-to-carrier-request-dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-define-carrier-responsible-region-dialog',
  templateUrl: './define-carrier-responsible-region-dialog.component.html',
  styleUrls: ['./define-carrier-responsible-region-dialog.component.css']
})
export class DefineCarrierResponsibleRegionDialogComponent implements OnInit {
  
  cities:City[]=[];
  districts:District[]=[];
  neighbourhoods:Neighbourhood[]=[];

  defineCarrierResponsibleRegionForm!:FormGroup;
  ngOnInit(): void {
this.createForm();
this.getAllCities();

  }
  constructor(
    private matDialogRef:MatDialogRef<DefineCarrierResponsibleRegionDialogComponent>,
    private carrierService:CarrierService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cityService:CityService,
    private districtService:DistrictService,
    private neighbourhoodService:NeighbourhoodService) {
    
    
  }

  createForm(){
    this.defineCarrierResponsibleRegionForm = this.formBuilder.group({
      city: [null],
      district: [null],
      neighbourhood: [null]
    });
    this.defineCarrierResponsibleRegionForm.get('city')?.valueChanges.subscribe(value => {
      this.getAllDistricts(value);
      this.defineCarrierResponsibleRegionForm.get('district')?.reset();
      this.defineCarrierResponsibleRegionForm.get('neighbourhood')?.reset();
    });
  
    this.defineCarrierResponsibleRegionForm.get('district')?.valueChanges.subscribe(value => {
      this.getAllNeighbourhoods(value);
      this.defineCarrierResponsibleRegionForm.get('neighbourhood')?.reset();
    }); 
  }
  defineCarrierResponsibleRegion(){
    if (this.defineCarrierResponsibleRegionForm.valid) {

      console.log(this.defineCarrierResponsibleRegionForm.value);
      const defineCarrierResponsibleRegionRequestDto:DefineResponsibleRegionToCarrierRequestDto = {
        carrierId:this.data.carrierId,
        responsibleCityKey:this.defineCarrierResponsibleRegionForm.get('city')?.value,
        responsibleDistrictKey:this.defineCarrierResponsibleRegionForm.get('district')?.value,
        responsibleNeighbourhoodKey:this.defineCarrierResponsibleRegionForm.get('neighbourhood')?.value
      }
      this.carrierService.defineResponsibleRegionToCarrier(defineCarrierResponsibleRegionRequestDto).subscribe({
        next:(response)=>{
          this.toastrService.success(response.message);
          this.matDialogRef.close();
        },
        error:(error:HttpErrorResponse)=>{
          this.toastrService.error(error.error.message);
          this.matDialogRef.close();
        }

      });      
    }
  }

  getAllCities(){
    this.cityService.getAllCities().subscribe({
      next:(response)=>{
        this.cities = response.data
      }
    })
  }
  
  getAllDistricts(cityKey:number){
    this.districtService.getAllDistrictsByCityKey(cityKey).subscribe(
      {next:(response)=>{
        this.districts=response.data
      }}
    )
  }

  getAllNeighbourhoods(districtKey:number){
    this.neighbourhoodService.getAllNeighbourhoodsByDistrictKey(districtKey).subscribe({
      next: (response)=> {
        this.neighbourhoods = response.data;
      }
    })
  }

}
