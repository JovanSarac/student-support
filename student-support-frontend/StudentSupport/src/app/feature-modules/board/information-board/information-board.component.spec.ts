import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBoardComponent } from './information-board.component';

describe('InformationBoardComponent', () => {
  let component: InformationBoardComponent;
  let fixture: ComponentFixture<InformationBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationBoardComponent]
    });
    fixture = TestBed.createComponent(InformationBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
