import {Component, ViewEncapsulation} from '@angular/core';
import {OrdersService} from "./orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent {

  public ordersTableMeta = this.service.getTableMeta();
  public ordersTableValues = this.service.getTableValues();

  constructor(private service: OrdersService) {
  }

  public _onAddReview() : void {
    console.log("Отзыв добавлен")
  }
}
