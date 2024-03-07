import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { userResponse } from '../../../Interfaces/userInterface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-users-view.component.html',
  styleUrl: './admin-users-view.component.css',
})
export class AdminUsersViewComponent {
  usersArr: any = [];

  constructor(private userService: UserService) {
    this.fetchUsers();
  }
  fetchUsers() {
    this.userService.getUsers().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.users) {
        console.log(res.users);
        this.usersArr = res.users;
      }
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.fetchUsers();
      this.isPopupOpen=false;
    });
  }

  isPopupOpen: boolean = false;

  openPopup() {
    this.isPopupOpen = true;
  }
}
