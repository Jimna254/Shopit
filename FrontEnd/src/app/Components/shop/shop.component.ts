import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private products: ProductsService
  ) {}
  ngOnInit(): void {
    this.fetchProducts();
  }
  id!: string;
  productsArr: any[] = [];
  Categoryname!: string;

  fetchProducts() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.id = params['id'];
    });
    this.products.getProductsbyCategorgoryId(this.id).subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.products) {
        console.log(res.products);
        this.productsArr = res.products;
        this.Categoryname = this.productsArr[0].category_name;
      }
    });

    console.log(this.products);
  }
}
