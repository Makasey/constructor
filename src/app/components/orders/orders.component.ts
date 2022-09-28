import {Component, OnInit} from '@angular/core';

type Order = {
  id: string,
  name: string,
  delivery_date: string,
  recipient: string,
  status: StatusType,
  amount: string
}

enum StatusType {
  CANCEL = 'Cancel',
  WAIT = 'Wait',
  PAID = 'Paid'
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public statusTypes = StatusType;

  public orders: Array<Order> = [
    {
      id: "64587930",
      name: "Букет малиновых роз",
      delivery_date: "23.05.2021",
      recipient: "Зиновьев Сергей",
      status: StatusType.WAIT,
      amount: "5739 ₽"
    },
    {
      id: "64587930",
      name: "Букет малиновых роз",
      delivery_date: "23.05.2021",
      recipient: "Зиновьев Сергей",
      status: StatusType.CANCEL,
      amount: "5739 ₽"
    },
    {
      id: "64587930",
      name: "Букет малиновых роз",
      delivery_date: "23.05.2021",
      recipient: "Зиновьев Сергей",
      status: StatusType.PAID,
      amount: "5739 ₽"
    },
    {
      id: "64587930",
      name: "Букет малиновых роз",
      delivery_date: "23.05.2021",
      recipient: "Зиновьев Сергей",
      status: StatusType.PAID,
      amount: "5739 ₽"
    },
    {
      id: "64587930",
      name: "Букет малиновых роз",
      delivery_date: "23.05.2021",
      recipient: "Зиновьев Сергей",
      status: StatusType.PAID,
      amount: "5739 ₽"
    }
  ]

  constructor() {
  }

  public _onAddReview() : void {
    console.log("Отзыв добавлен")
  }

  ngOnInit(): void {
  }
}
