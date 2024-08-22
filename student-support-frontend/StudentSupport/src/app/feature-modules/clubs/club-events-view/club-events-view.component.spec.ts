import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEventsViewComponent } from './club-events-view.component';

describe('ClubEventsViewComponent', () => {
  let component: ClubEventsViewComponent;
  let fixture: ComponentFixture<ClubEventsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubEventsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubEventsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
