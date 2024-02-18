import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  @Input() imageUrls!: string[];
  @Input() loop: boolean = true;
  @Input() dots: boolean = true;
  @Output() onSlideChange!: EventEmitter<number>;

  activeIndex = 0;
  ngOnInit(): void {}

  nextSlide() {
    this.activeIndex = (this.activeIndex  + 1) % this.imageUrls.length;
    console.log("active:", this.activeIndex);
  }
  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
    console.log("active:", this.activeIndex);
  }
}
