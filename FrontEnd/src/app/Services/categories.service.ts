import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, categoriesResponse } from '../Interfaces/categoryInterface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  createCategory(category: Category) {
    return this.http.post<{ message: string; error: string }>(
      'http://localhost:3110/categories',
      category
    );
  }

  getAllCategories() {
    return this.http.get<categoriesResponse>(
      'http://localhost:3110/categories',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3110/categories/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  getOneCategoryDetails(id: string) {
    return this.http.get<{ category: Category[] }>(
      `http://localhost:3110/categories/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
  updateCategoryDetails(id: string, details: Category) {
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
