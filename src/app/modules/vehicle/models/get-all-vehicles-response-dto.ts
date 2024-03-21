import { VehicleStatus } from "../enums/vehicle-status";
import { VehicleTypeEnum } from "../enums/vehicle-type-enum";

export interface GetAllVehiclesResponseDto {

    id:number,
    carrierFullName:string,
    brandName:string,
    modelName:string,
    length:number,
    width:number,
    heighth:number,
    motorChassisNumber:string,
    lastMaintenanceDate?:Date,
    vehicleType:VehicleTypeEnum,
    vehicleStatus:VehicleStatus
}
