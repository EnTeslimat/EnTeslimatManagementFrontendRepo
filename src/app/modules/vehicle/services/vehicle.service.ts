import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllVehiclesResponseDto } from '../models/get-all-vehicles-response-dto';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { CreateVehicleRequestDto } from '../../carrier/models/create-vehicle-request-dto';
import { CarrierVehiclesResponseDto } from '../models/carrier-vehicles-response-dto';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  apiUrl:string = environment.apiUrl+'Vehicles';
  constructor(private httpClient:HttpClient) { }


  getAllVehicles():Observable<ListResponseModel<GetAllVehiclesResponseDto>>{
   let newUrl = this.apiUrl + "/getAllVehicles";
   return this.httpClient.get<ListResponseModel<GetAllVehiclesResponseDto>>(newUrl);
  }

  addVehicleToCarrier(createVehicleRequestDto:CreateVehicleRequestDto):Observable<ResponseModel>{
    let newUrl = this.apiUrl + '/addVehicleToCarrier';
    return this.httpClient.post<ResponseModel>(newUrl,createVehicleRequestDto);
  }

  getAllCarrierVehiclesByCarrierId(carrierId:number):Observable<ListResponseModel<CarrierVehiclesResponseDto>>{
    let newUrl = this.apiUrl + '/getAllCarriersVehicleByCarrierId';
    return this.httpClient.get<ListResponseModel<CarrierVehiclesResponseDto>>(newUrl,{params:{carrierId: carrierId}});
  }
}
