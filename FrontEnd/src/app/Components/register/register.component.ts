import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink,RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  error = false;
  success = false;

  errorMsg!: String;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      this.error = true;
      this.errorMsg = 'Please fill in all the fields';
      setTimeout(() => {
        this.error = false;
      }, 3000); 
    }
    }
  }
