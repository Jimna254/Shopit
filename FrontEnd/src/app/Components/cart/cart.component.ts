import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { deleteItemCart } from '../../Interfaces/cartInterface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule],
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

  isSuccess = false;
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
                console.log(OneUsercartResponse.Cartitems);
                this.cartArr = OneUsercartResponse.Cartitems || [];
                if (OneUsercartResponse.Cartitems) {
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

  deleteItemCart(id: string, product_id: string) {
    console.log('delete Item function called with id:', id);

    const details: deleteItemCart = {
      cart_id: id,
      product_id,
    };

    this.cartService.deleteItemCart(id, details).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchCart();
        this.successMessage = 'Product removed successfully.';
        this.isSuccess = true;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to remove the product. Please try again.';
        this.successMessage = '';
      },
    });
  }
}
