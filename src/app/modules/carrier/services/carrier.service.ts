import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllCarrierDto } from '../models/get-all-carrier-dto';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { CreateCarrierRequestDto } from '../models/create-carrier-request-dto';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  apiUrl = environment.apiUrl+"Carriers/";
  constructor(private httpClient:HttpClient) { }

  getAllCarriers():Observable<ListResponseModel<GetAllCarrierDto>>{
    let newApiUrl = this.apiUrl + "getAllCarriers";
    return this.httpClient.get<ListResponseModel<GetAllCarrierDto>>(newApiUrl);
  }

  createCarrier(createCarrierRequestDto:CreateCarrierRequestDto):Observable<ResponseModel>{
    let newApiUrl=this.apiUrl +"createCarrier";
    return this.httpClient.post<ResponseModel>(newApiUrl,createCarrierRequestDto);
  }

  deleteCarrierById(id:number,deletedById:number):Observable<ResponseModel>{
    let newApiUrl=this.apiUrl+"deleteLocallyById";
    return this.httpClient.delete<ResponseModel>(newApiUrl,{params:{id:id,deletedById:deletedById}});
  }
  
}
