import { Pipe, PipeTransform } from '@angular/core';
import { DeliveryStatusEnum } from '../../package/models/enums/delivery-status-enum';

@Pipe({
  name: 'deliveryStatus'
})
export class DeliveryStatusPipe implements PipeTransform {

  transform(value: DeliveryStatusEnum): string {
    switch (value) {
      case DeliveryStatusEnum.AssignedToCarrier:
        return 'Taşıyıcı Tarafından Teslim Alındı';
      case DeliveryStatusEnum.DeliveredToCustomer:
        return 'Müşteriye Teslim Edildi';
      case DeliveryStatusEnum.Cancelled:
        return 'İptal Edildi';
      case DeliveryStatusEnum.InDistribution:
          return 'Dağıtımda';
      case DeliveryStatusEnum.InWareHouse:
        return 'Depoya Teslim Edildi';
      case DeliveryStatusEnum.ReadyToCollection:
        return 'Toplanmaya Hazır';
      default:
        return 'Bilinmiyor';
    }
  }

}
