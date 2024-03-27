import { Pipe, PipeTransform } from '@angular/core';
import { DeliveryTypeEnum } from '../../package/models/enums/delivery-type-enum';

@Pipe({
  name: 'deliveryType'
})
export class DeliveryTypePipe implements PipeTransform {

  transform(value: DeliveryTypeEnum){
    switch(value){
      case DeliveryTypeEnum.Express:
        return 'Ekspres'
      case DeliveryTypeEnum.Premium:
        return 'Premium'
      case DeliveryTypeEnum.Standart:
        return 'Standart'
      default:
        return 'Bilinmiyor' 
    }
      
  }

}
