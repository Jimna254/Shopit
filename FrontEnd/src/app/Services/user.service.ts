import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  updateUser,
  userResponse,
  usersResponse,
} from '../Interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = localStorage.getItem('token') as string;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<{ users: usersResponse; error: string }>(
      'http://localhost:3110/users',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }
  deleteUser(id: string) {
    return this.http.delete<{ message: string; error: string }>(
      `http://localhost:3110/users/delete/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  getOneUserDetails(id: string) {
    return this.http.get<{ user: userResponse[]; error: { error: string } }>(
      `http://localhost:3110/users/${id}`,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: this.token,
        }),
      }
    );
  }

  updateUserDetails(id: string, details: updateUser) {
    return this.http.put<{ message: string; error: string }>(
      `http://localhost:3110/users/update/${id}`,
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
