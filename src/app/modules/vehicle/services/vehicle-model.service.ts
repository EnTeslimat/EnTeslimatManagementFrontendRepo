import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { VehicleModel } from '../models/vehicle-model';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {
  apiUrl:string = environment.apiUrl+'VehicleModels';

  constructor(private httpClient:HttpClient) { }

  getAllVehicleModelsByBrandId(brandId:number):Observable<ListResponseModel<VehicleModel>>{
  let newUrl = this.apiUrl + '/getAllVehicleModelsByBrandId';
  return this.httpClient.get<ListResponseModel<VehicleModel>>(newUrl,{params:{brandId: brandId}});
  }
}
