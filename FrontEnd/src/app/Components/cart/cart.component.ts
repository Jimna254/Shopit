import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  productquantity: number = 1;

  quantity(value: string) {
    if (this.productquantity >= 1 && value == 'max') {
      this.productquantity += 1;
    } else if (this.productquantity > 1 && value == 'min') {
      this.productquantity -= 1;
    }
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}
  id!: string;
  successMessage: string = '';
  errorMessage: string = '';
  cartArr: any = [];
  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.readToken(token).subscribe({
        next: (response) => {
          if (response && response.info && response.info.user_id) {
            this.cartService.getUserCart(response.info.user_id).subscribe({
              next: (OneUsercartResponse) => {
                console.log(OneUsercartResponse.cartDetails);
                this.cartArr = OneUsercartResponse.cartDetails || [];
                if (OneUsercartResponse.cartDetails) {
                  console.log('Cart loaded successfully');
                } else if (OneUsercartResponse.error) {
                  console.error(
                    'Error fetching cart:',
                    OneUsercartResponse.error.message
                  );
                } else {
                  console.error(
                    'The cart data is not in the expected format:',
                    OneUsercartResponse
                  );
                }
              },
              error: (error) => {
                console.error('Error fetching cart:', error);
              },
            });
          } else {
            console.error(
              'User ID is missing from the token response:',
              response
            );
          }
        },
        error: (error) => {
          console.error('Error decoding token:', error);
        },
      });
    } else {
      console.error('Token not found in localStorage');
    }
  }
}
