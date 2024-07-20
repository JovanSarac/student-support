import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourEventsComponent } from './your-events.component';

describe('YourEventsComponent', () => {
  let component: YourEventsComponent;
  let fixture: ComponentFixture<YourEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourEventsComponent]
    });
    fixture = TestBed.createComponent(YourEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
