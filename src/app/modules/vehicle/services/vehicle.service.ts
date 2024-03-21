import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllVehiclesResponseDto } from '../models/get-all-vehicles-response-dto';
import { Observable } from 'rxjs';

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
}
