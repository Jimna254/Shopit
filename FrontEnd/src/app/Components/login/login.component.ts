import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  error = false;
  success = false;
  errorMsg!: string;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // You can navigate to another page after successful login
      this.router.navigate(['/home']);
    } else {
      this.error = true;
      this.errorMsg = 'Please fill in all the fields';
      setTimeout(() => {
        this.error = false;
      }, 3000);
    }
  }
}
