import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-categories-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-categories-view.component.html',
  styleUrl: './admin-categories-view.component.css',
})
export class AdminCategoriesViewComponent implements OnInit {
  categoriesArr: any[] = [];
  constructor(private categories: CategoriesService) {}

  ngOnInit() {
    this.fetchCategories();
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

  deleteCategory(id: string) {
    this.categories.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.fetchCategories();
    });
  }

  isPopupOpen: boolean = false;

  openPopup() {
    this.isPopupOpen = true;
  }
}
