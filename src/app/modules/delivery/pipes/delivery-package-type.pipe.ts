import { Pipe, PipeTransform } from '@angular/core';
import { DeliveryPackageTypeEnum } from '../enums/delivery-type-enums';

@Pipe({
  name: 'deliveryPackageType'
})
export class DeliveryPackageTypePipe implements PipeTransform {

  transform(value: DeliveryPackageTypeEnum): string {
    switch (value) {
      case DeliveryPackageTypeEnum.AssignablePackageDirectlyCarrier:
        return 'Direkt Olarak Taşıyıcıya Atanacak Paket';
      case DeliveryPackageTypeEnum.AssignablePackageToSellerBatch:
        return 'Bacthe Atanacak Paket';
      default:
        return 'Bilinmiyor';
    }
  }

}
