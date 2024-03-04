import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, RouterLink],
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
}
