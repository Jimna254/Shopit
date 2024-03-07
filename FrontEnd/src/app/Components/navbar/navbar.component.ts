import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  name!: string;
  id!: string;
  constructor(private authService: AuthService, private router: Router) {
    this.getUserdetails();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getUserdetails() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.readToken(token).subscribe((res) => {
        this.name = res.info.Fname;
        this.id = res.info.user_id;
        console.log('User details:', res.info);
      });
    } else {
      console.error('Token not found in localStorage');
    }
  }
}
