import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { registerUser, updateUser } from '../../../Interfaces/userInterface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-adminupdateuser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adminupdateuser.component.html',
  styleUrl: './adminupdateuser.component.css',
})
export class AdminupdateuserComponent {
  updateUserForm!: FormGroup;
  id!: string;
  user!: updateUser;
  successMsg!: string;
  errorMsg!: string;
  visible = false;
  visible2 = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.updateUserForm = this.fb.group({
      Fname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone_number: ['', [Validators.required]],
    });
    this.getUserId();
  }

  getUserId() {
    this.route.params.subscribe((params) => {
      console.log(params['user_id']);
      this.id = params['user_id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.userService.getOneUserDetails(this.id).subscribe((response) => {
      console.log(response.user[0]);

      this.user = response.user[0];

      this.updateUserForm.patchValue({
        Fname: this.user.Fname,
        Lname: this.user.Lname,
        email: this.user.email,
        phone_number: this.user.phone_number,
      });
    });
  }
  updateUser() {
    this.userService
      .updateUserDetails(this.id, this.updateUserForm.value)
      .subscribe((response) => {
        if (response.message) {
          this.visible2 = true;
          this.successMsg = response.message;

          setTimeout(() => {
            this.visible2 = false;
          }, 3000);
        }
      });
  }
}
