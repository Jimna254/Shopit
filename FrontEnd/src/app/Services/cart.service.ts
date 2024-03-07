import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cart,
  OneUsercartResponse,
  deleteItemCart,
} from '../Interfaces/cartInterface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token') as string;

  

  getUserCart(id: string) {
    const token = localStorage.getItem('token') as string;

    return this.http.get<OneUsercartResponse>(
      ` http://localhost:3110/cart/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token,
        }),
      }
    );
  }

  deleteItemCart(id: string, details: deleteItemCart) {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      token,
    });

    const req = new HttpRequest(
      'DELETE',
      `http://localhost:3110/cart/delete/${id}`,
      details,
      { headers }
    );

    return this.http.request(req);
  }

  checkoutCart(id: string) {
    const token = localStorage.getItem('token') as string;

    return this.http.put<{ message: string }>(
      `PUT http://localhost:3110/cart/checkout/58dd0a71-474c-4f81-a2dd-f31c9f8badf5
    ${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token,
        }),
      }
    );
  }
}
