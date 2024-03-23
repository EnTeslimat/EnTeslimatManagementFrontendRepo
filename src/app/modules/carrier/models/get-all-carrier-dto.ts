import { EntityStatuses } from "../../customer/models/enums/entity-statuses";

export interface GetAllCarrierDto {
    id:number;
    firstName:string;
    middleName?:string;
    lastName:string;
    phoneNumber:string;
    carrierUniqueCode:string;
    email:string;
    phone:string;
    entityStatus:EntityStatuses
}
