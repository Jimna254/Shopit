import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.css',
})
export class ViewPageComponent {}
