import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { registerUser } from '../../Interfaces/userInterface';
import { log } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  error = false;
  success = false;

  successMsg!: String;
  errorMsg!: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register(details: registerUser) {
    console.log(details.password);

    this.authService.registerUser(this.registerForm.value).subscribe((res) => {
      console.log(res);
        if (res.message) {
          this.success = true;
          this.successMsg = res.message;
          setTimeout(() => {
            this.success= false;
            this.router.navigate(['login']);
          }, 2000);
        } else if (res.messageerror) {
          this.error = true;
          this.errorMsg = res.messageerror;
          setTimeout(() => {
            this.error= false;
          }, 2000);
        }
    });
  }
}
