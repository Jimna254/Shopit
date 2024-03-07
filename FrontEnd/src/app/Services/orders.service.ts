import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, ordersResponse } from '../Interfaces/orderInterface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  createOrder(order: Order) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3110/order',
      order,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  getAllOrders() {
    return this.http.get<ordersResponse>('http://localhost:3110/order', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: this.token,
      }),
    });
  }

  getOrderbyUserid(id: string) {
    return this.http.get<{ order: Order[] }>(
      `http://localhost:3110/order/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  cancelOrder(id: string) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3110/order/cancel/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  changeStatus(id: string) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3110/order/changeStatus/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
}
