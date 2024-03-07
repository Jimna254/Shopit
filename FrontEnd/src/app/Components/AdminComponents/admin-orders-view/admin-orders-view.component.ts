import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OrdersService } from '../../../Services/orders.service';

@Component({
  selector: 'app-admin-orders-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-orders-view.component.html',
  styleUrl: './admin-orders-view.component.css',
})
export class AdminOrdersViewComponent implements OnInit {
  ordersArr: any[] = [];

  constructor(private orders: OrdersService) {
    this.fetchOrders();
  }
  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orders.getAllOrders().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.orders) {
        console.log(res.orders);
        this.ordersArr = res.orders;
      }
    });

    console.log(this.orders);
  }
  onCheckboxClicked(id: string): void {
    this.changeStatus(id);
  }
  changeStatus(id: string) {
    this.orders.changeStatus(id).subscribe((res) => {
      console.log(res);
      this.fetchOrders();
    });
  }
}
