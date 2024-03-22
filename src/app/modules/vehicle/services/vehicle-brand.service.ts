import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { VehicleBrand } from '../models/vehicle-brand';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class VehicleBrandService {

  apiUrl:string = environment.apiUrl+'VehicleBrands';
  constructor(private httpClient:HttpClient) { }

  getAllVehicleBrands():Observable<ListResponseModel<VehicleBrand>>{
    let newUrl = this.apiUrl+'/getAllVehicleBrands';
    return this.httpClient.get<ListResponseModel<VehicleBrand>>(newUrl);
  }
}
