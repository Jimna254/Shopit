import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoriesService } from '../../Services/categories.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    RouterLink,
    NavbarComponent,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carousselInner') carousselInner!: ElementRef;
  imageWidth: number = 0;
  currentIndex: number = 0;

  ngAfterViewInit(): void {
    this.calculateImageWidth();
  }

  calculateImageWidth(): void {
    this.imageWidth =
      this.carousselInner.nativeElement.querySelector('img').clientWidth;
  }

  nextSlide(): void {
    const numImages =
      this.carousselInner.nativeElement.querySelectorAll('img').length;
    if (this.currentIndex < numImages - 1) {
      this.currentIndex++;
      this.updateSlide();
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlide();
    }
  }

  updateSlide(): void {
    this.carousselInner.nativeElement.style.transform = `translateX(-${
      this.currentIndex * this.imageWidth
    }px)`;
  }
  categoriesArr: any[] = [];
  id!: string;
  paginatedArr: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private categories: CategoriesService,
    private route: ActivatedRoute,
    private products: ProductsService
  ) {
    this.fetchCategories();
  }

  maxPage(): number {
    return Math.ceil(this.categoriesArr.length / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.maxPage() }, (_, index) => index + 1);
  }

  fetchCategories() {
    this.categories.getAllCategories().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.categories) {
        console.log(res.categories);
        this.categoriesArr = res.categories;
        this.updatePaginatedCategories();
      }
    });

    console.log(this.categories);
  }

  updatePaginatedCategories() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArr = this.categoriesArr.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedCategories();
  }

  getProductsbyCategoryId() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.id = params['id'];
      this.products.getProductsbyCategorgoryId(this.id);
    });
  }
}
