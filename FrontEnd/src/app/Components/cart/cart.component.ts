import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  productquantity: number = 1;

  quantity(value: string) {
    if (this.productquantity >= 1 && value == "max") {
      this.productquantity += 1;
    } else if(this.productquantity>1 && value == "min"){
      this.productquantity -=1;
      
    }
  }
}
