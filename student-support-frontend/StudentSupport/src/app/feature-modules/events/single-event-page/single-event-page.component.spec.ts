import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEventPageComponent } from './single-event-page.component';

describe('SingleEventPageComponent', () => {
  let component: SingleEventPageComponent;
  let fixture: ComponentFixture<SingleEventPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleEventPageComponent]
    });
    fixture = TestBed.createComponent(SingleEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
