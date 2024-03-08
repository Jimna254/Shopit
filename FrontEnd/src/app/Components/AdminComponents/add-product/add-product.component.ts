import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../Services/products.service';
import { CategoriesService } from '../../../Services/categories.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  addProductForm!: FormGroup;
  sucessMsg!: string;
  errorMsg!: string;
  categoriesArr: any[] = [];

  imageUpload: any[] = [];
  imgUrl: string | null = null;

  visible = false;
  visible2 = false;

  constructor(
    private productService: ProductsService,
    private categories: CategoriesService,

    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.addProductForm = this.fb.group({
      productname: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    this.fetchCategories();
  }
  createProduct(): void {
    if (this.addProductForm.valid) {
      this.productService.createProduct(this.addProductForm.value).subscribe({
        next: (Res) => {
          if (Res.message) {
            this.visible2 = true;
            this.sucessMsg = Res.message;
            setTimeout(() => {
              this.visible = true;
              this.errorMsg = Res.message;
            }, 2000);
          }
        },
        error: (error) => {
          console.error('Product creation failed', error);
        },
      });
    } else {
      console.error('Product form is invalid');
    }
  }
  fetchCategories() {
    this.categories.getAllCategories().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.categories) {
        console.log(res.categories);
        this.categoriesArr = res.categories;
      }
    });

    console.log(this.categories);
  }

  async uploadImage(event: any) {
    const target = event.target;
    const files = target.files;
    if (files) {
      console.log(files);
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'Shopit_images');
      formData.append('cloud_name', 'dzz8vdx5s');

      console.log(formData);

      await fetch('https://api.cloudinary.com/v1_1/dzz8vdx5s/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res: any) => {
          return res.json();
        })
        .then((data) => {
          console.log('this is the URL', data.url);
          this.addProductForm.get('image')?.setValue(data.url);
          return (data.url = this.imgUrl);
        });
      // })
    }
  }
}
