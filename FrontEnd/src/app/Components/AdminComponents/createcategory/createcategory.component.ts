import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../../Services/categories.service';

@Component({
  selector: 'app-createcategory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './createcategory.component.html',
  styleUrl: './createcategory.component.css',
})
export class CreatecategoryComponent {
  addCategoryForm!: FormGroup;
  sucessMsg!: string;
  imgUrl!: string;
  visible2 = false;

  constructor(
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.addCategoryForm = this.fb.group({
      categoryname: ['', [Validators.required]],

      image: ['', [Validators.required]],
    });
  }
  createCategory(): void {
    if (this.addCategoryForm.valid) {
      this.categoryService
        .createCategory(this.addCategoryForm.value)
        .subscribe({
          next: (Res) => {
            if (Res.message) {
              this.visible2 = true;
              this.sucessMsg = Res.message;

              setTimeout(() => {
                this.visible2 = false;
              }, 3000);
            }
          },
          error: (error) => {
            console.error('Category creation failed', error);
          },
        });
    } else {
      console.error('Category form is invalid');
    }
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
          this.addCategoryForm.get('image')?.setValue(data.url);
          return (data.url = this.imgUrl);
        });
      // })
    }
  }
}
