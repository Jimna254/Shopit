import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../Services/categories.service';
import { Category } from '../../../Interfaces/categoryInterface';

@Component({
  selector: 'app-categoryupdate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoryupdate.component.html',
  styleUrl: './categoryupdate.component.css',
})
export class CategoryupdateComponent {
  updateCategoryForm!: FormGroup;
  id!: string;
  category!: Category;
  sucessMsg!: string;
  visible2 = false;
  imgUrl!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) {
    this.updateCategoryForm = this.fb.group({
      categoryname: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.getCategoryId();
    this.getcategoryDetails();
  }

  getCategoryId() {
    this.route.params.subscribe((params) => {
      this.id = params['category_id'];
      if (this.id) {
        this.getcategoryDetails();
      }
    });
  }
  getcategoryDetails() {
    this.categoryService.getOneCategoryDetails(this.id).subscribe({
      next: (response) => {
        console.log('response', response);
        this.category = response.category[0];

        this.updateCategoryForm.patchValue({
          categoryname: this.category.categoryname,
          image: this.category.image,
        });
        console.log('category Details', this.getcategoryDetails);
      },
      error: (error) =>
        console.error('Error fetching Category details:', error),
    });
  }

  updatecategory() {
    if (this.updateCategoryForm.valid) {
      this.categoryService
        .updateCategoryDetails(this.id, this.updateCategoryForm.value)
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

          error: (error) => console.error('Error updating category:', error),
        });
    } else {
      console.error('Form is not valid');
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
          this.updateCategoryForm.get('image')?.setValue(data.url);
          return (data.url = this.imgUrl);
        });
      // })
    }
  }
}
