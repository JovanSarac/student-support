import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var jQuery: any;

@Component({
  selector: 'app-announcement-image-carousel',
  templateUrl: './announcement-image-carousel.component.html',
  styleUrl: './announcement-image-carousel.component.css',
})
export class AnnouncementImageCarouselComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}

  ngOnInit(): void {
    (jQuery('#carouselExampleIndicators') as any).carousel();
  }
}
