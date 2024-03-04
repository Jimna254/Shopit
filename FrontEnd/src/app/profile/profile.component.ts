import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
