import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllCustomersForManagementResponseDto } from '../models/response/get-all-customers-for-management-response-dto';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseApiUrl = environment.apiUrl + 'Customers/';
  constructor(private httpClient: HttpClient) {}

  getAllCustomersForManagement(): Observable<
    ListResponseModel<GetAllCustomersForManagementResponseDto>
  > {
    return this.httpClient.get<
      ListResponseModel<GetAllCustomersForManagementResponseDto>
    >(this.baseApiUrl + 'getAllCustomersForManagement');
  }
  deleteCustomerLocallyById(
    id: number,
    deletedById: number
  ): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}deleteCustomerLocallyById?id=${id}&deletedById=${deletedById}`,
      null
    );
  }
  activateCustomerByCustomerId(id: number): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}activateCustomer/${id}`,
      null
    );
  }
}
