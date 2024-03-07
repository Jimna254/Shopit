import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.css',
})
export class ViewPageComponent {
  id!: string;
  product: any = [];
  errorMessage!: string;
  successMessage!: string;
  visible = false;
  visible2 = false;

  constructor(
    private products: ProductsService,
    private route: ActivatedRoute,
    private theroute: Router,
    private auth: AuthService
  ) {
    this.getProductDetails();
  }

  getProductDetails() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.id = params['id'];
      this.products.getOneProductDetails(this.id).subscribe((res) => {
        if (res.product) {
          this.product = res.product[0];
        }
      });
    });
  }

  createCartNow(productId: string) {
    if (!productId) {
      this.errorMessage =
        'Product ID is undefined. Cannot proceed with creating cart.';
      return;
    }
    console.log('Product ID:', productId);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      this.errorMessage = 'You must be logged in to create a cart.';
      return;
    }

    // Decode token to get user details
    this.auth.readToken(token).subscribe({
      next: (res) => {
        const userId = res.info.user_id;
        console.log('User details:', res.info);

        // Use user details to create the cart
        const cartDetails = {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        };

        console.log('Cart details:', cartDetails);

        // Proceed to create the cart
        this.auth.createCart(cartDetails).subscribe({
          next: (response) => {
            console.log('Cart created successfully:', response);
            this.visible = true;
            //navigate to cart

            this.successMessage = response.message;
            setTimeout(() => {
              this.visible = false;
              this.theroute.navigate(['/cart']);
            }, 3000);
          },
        });
      },
      error: (error) => {
        console.error('Error decoding token:', error);
        this.errorMessage =
          'Error fetching user details. Cannot proceed with creating cart.';
      },
    });
  }
}
