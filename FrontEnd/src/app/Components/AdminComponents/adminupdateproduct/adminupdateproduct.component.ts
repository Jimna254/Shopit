import { Component } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../Interfaces/productInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminupdateproduct',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adminupdateproduct.component.html',
  styleUrl: './adminupdateproduct.component.css',
})
export class AdminupdateproductComponent {
  updateProductForm!: FormGroup;
  id!: string;
  product!: Product;
  sucessMsg!: string;

  visible = false;
  visible2 = false;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.updateProductForm = this.fb.group({
      productname: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.getProductId();
  }
  getProductId() {
    this.route.params.subscribe((params) => {
      this.id = params['product_id'];
      if (this.id) {
        this.getProductDetails();
      }
    });
  }
  getProductDetails() {
    this.productService.getOneProductDetails(this.id).subscribe({
      next: (response) => {
        console.log('response', response);
        this.product = response.product[0];

        this.updateProductForm.patchValue({
          productname: this.product.productname,
          category_id: this.product.category_id,
          quantity: this.product.quantity,
          description: this.product.description,
          price: this.product.description,
          image: this.product.image,
        });
        console.log('Product Details', this.getProductDetails);
      },
      error: (error) => console.error('Error fetching Tour details:', error),
    });
  }

  updateProduct() {
    if (this.updateProductForm.valid) {
      this.productService
        .updateProductDetails(this.id, this.updateProductForm.value)
        .subscribe({
          next: (response) => {
            if (response.message) {
              this.visible2 = true;
              this.sucessMsg = response.message;

              setTimeout(() => {
                this.visible2 = false;
              }, 3000);
            }
          },

          error: (error) => console.error('Error updating Product:', error),
        });
    } else {
      console.error('Form is not valid');
    }
  }
}
