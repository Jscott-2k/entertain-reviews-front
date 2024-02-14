import { Component, ElementRef, HostListener } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const sections = this.el.nativeElement.querySelectorAll('section');
    sections.forEach((section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Adjust threshold as needed
      const threshold = windowHeight * 0.8; // Section is considered in view if at least 80% visible
      if (rect.top < threshold && rect.bottom >= 0 && rect.top <= windowHeight) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
}
}
