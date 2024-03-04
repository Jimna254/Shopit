import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { loginDetails } from '../../Interfaces/userInterface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  error = false;
  success = false;
  successMsg!: string;
  errorMsg!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(details: loginDetails) {
    console.log('Login Details:' + details);
    this.authService.loginUser(details).subscribe((res) => {
      if (res.error) {
        this.error = true;
        this.errorMsg = res.error;

        setTimeout(() => {
          this.error = false;
        }, 3500);
      } else if (res.message) {
        this.success = true;
        this.successMsg = res.message;

        localStorage.setItem('token', res.token);
        // Redirect to dashboard page after successful login
        this.authService.readToken(res.token).subscribe((res) => {
          setTimeout(() => {
            if (res.info.role == 'admin') {
              this.router.navigate(['admin']);
            } else if (res.info.role == 'user') {
              this.router.navigate(['user']);
            } else {
              {
                console.log('Role Info Not Available');
              }
            }
          }, 3000);
        });
      }
    });
  }
}
