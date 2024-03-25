import { DeliveryStatusEnum } from "../../package/models/enums/delivery-status-enum";
import { DeliveryTypeEnum } from "../../package/models/enums/delivery-type-enum";
import { DeliveryPackageTypeEnum } from "../enums/delivery-type-enums";

export interface GetAllDeliveriesForManagementResponseDto {
    id:number,
    collectorCarrierName?:string,
    distributorCarrierName?:string,
    createdTime?:Date,
    sellerBatchBarcode?:string,
    packageBarcode:string,
    deliveryAddress:string,
    deliveryPackageType:DeliveryPackageTypeEnum,
    deliveryStatus:DeliveryStatusEnum,
    deliveryType:DeliveryTypeEnum,
    deliveredDate?:Date,
    desi:number,
    receiverFullName:string,
    cityName:string,
    districtName:string,
    neighbourhoodName:string,
    fullAddress:string
}
