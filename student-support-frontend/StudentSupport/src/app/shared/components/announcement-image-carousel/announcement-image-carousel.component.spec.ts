import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementImageCarouselComponent } from './announcement-image-carousel.component';

describe('AnnouncementImageCarouselComponent', () => {
  let component: AnnouncementImageCarouselComponent;
  let fixture: ComponentFixture<AnnouncementImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementImageCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
