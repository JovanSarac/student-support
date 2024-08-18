import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleClubPageComponent } from './single-club-page.component';

describe('SingleClubPageComponent', () => {
  let component: SingleClubPageComponent;
  let fixture: ComponentFixture<SingleClubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleClubPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleClubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
