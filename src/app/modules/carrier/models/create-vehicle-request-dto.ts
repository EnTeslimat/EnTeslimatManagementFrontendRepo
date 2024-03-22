import { VehicleTypeEnum } from "../../vehicle/enums/vehicle-type-enum";
import { FuelTypeEnum } from "../enums/fuel-type-enum";

export interface CreateVehicleRequestDto {
    carrierId:number,
    createdById:number,
    vehicleType:VehicleTypeEnum,
    identityPlateNumber:string,
    weightCapacity:number,
    dateOfEntryTimeIntoTraffic:Date,
    fuelType:FuelTypeEnum,
    length:number,
    width:number,
    height:number
    vehicleBrandId:number,
    vehicleModelId:number,
    motorChassisNumber:string,
    lastMaintenanceDate?:Date
}
