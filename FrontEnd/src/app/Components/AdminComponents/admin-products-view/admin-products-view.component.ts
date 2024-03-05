import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-products-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-products-view.component.html',
  styleUrl: './admin-products-view.component.css',
})
export class AdminProductsViewComponent implements OnInit {
  productsArr: any[] = [];
  constructor(private products: ProductsService) {}
  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.products.getAllProducts().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.products) {
        console.log(res.products);
        this.productsArr = res.products;
      }
    });

    console.log(this.products);
  }

  deleteProduct(id: string) {
    this.products.deleteProduct(id).subscribe((res) => {
      console.log(res);
      this.fetchProducts();
    });
  }
}
