import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, productsResponse } from '../Interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  createProduct(product: Product) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3110/products',
      product
    );
  }

  getAllProducts() {
    return this.http.get<productsResponse>('http://localhost:3110/products', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: this.token,
      }),
    });
  }

  getProductsbyCategorgoryId(id: string) {
    return this.http.get<productsResponse>(
      `http://localhost:3110/products/prodbycategory/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3110/products/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  getOneProductDetails(id: string) {
    return this.http.get<{ product: Product[] }>(
      `http://localhost:3110/products/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
  updateProductDetails(id: string, details: Product) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3110/products/update/${id}`,
      details,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
}
