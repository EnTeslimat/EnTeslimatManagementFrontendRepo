import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllDeliveriesForManagementResponseDto } from '../models/get-all-deliveries-for-management-response-dto';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {


  private apiUrl:string=environment.apiUrl+'Deliveries/'

  constructor(private httpClient:HttpClient) { }

  getAllDeliveriesForManagement():Observable<ListResponseModel<GetAllDeliveriesForManagementResponseDto>>{
    let newUrl = this.apiUrl + 'getAllDeliveriesForManagement';
    return this.httpClient.get<ListResponseModel<GetAllDeliveriesForManagementResponseDto>>(newUrl);
  }
}
