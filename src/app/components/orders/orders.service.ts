import { Injectable } from '@angular/core';
import { LZTableMeta, LZTableValues } from '../table/types';
import { StatusType } from '../status/status.component';

@Injectable()
export class OrdersService {
  public getTableValues(): LZTableValues[] {
    return [
      {
        id: '64587930',
        name: 'Букет малиновых роз',
        delivery_date: '23.05.2021',
        recipient: 'Зиновьев Сергей',
        status: StatusType.WAIT,
        amount: '5739 ₽',
        review: true,
      },
      {
        id: '64587930',
        name: 'Букет малиновых роз',
        delivery_date: '23.05.2021',
        recipient: 'Зиновьев Сергей',
        status: StatusType.CANCEL,
        amount: '5739 ₽',
        review: true,
      },
      {
        id: '64587930',
        name: 'Букет малиновых роз',
        delivery_date: '23.05.2021',
        recipient: 'Зиновьев Сергей',
        status: StatusType.PAID,
        amount: '5739 ₽',
        review: true,
      },
      {
        id: '64587930',
        name: 'Букет малиновых роз',
        delivery_date: '23.05.2021',
        recipient: 'Зиновьев Сергей',
        status: StatusType.PAID,
        amount: '5739 ₽',
        review: true,
      },
      {
        id: '64587930',
        name: 'Букет малиновых роз',
        delivery_date: '23.05.2021',
        recipient: 'Зиновьев Сергей',
        status: StatusType.PAID,
        amount: '5739 ₽',
        review: true,
      },
    ];
  }

  public getTableMeta(): LZTableMeta[] {
    return [
      {
        label: 'Номер заказа',
        fieldKey: 'id',
        customClass: 'purchase_id',
      },
      {
        label: 'Название',
        fieldKey: 'name',
        customClass: 'purchase_name',
      },
      {
        label: 'Дата доставки',
        fieldKey: 'delivery_date',
        customClass: 'purchase_delivery_date',
      },
      {
        label: 'Получатель',
        fieldKey: 'recipient',
        customClass: 'purchase_recipient',
      },
      {
        label: 'Статус',
        fieldKey: 'status',
        templateKey: 'statusTemplate',
        customClass: 'purchase_status',
      },
      {
        label: 'Сумма',
        fieldKey: 'amount',
        customClass: 'purchase_amount',
      },
      {
        fieldKey: 'review',
        templateKey: 'buttonTemplate',
        customClass: 'purchase_review',
      },
    ];
  }
}
