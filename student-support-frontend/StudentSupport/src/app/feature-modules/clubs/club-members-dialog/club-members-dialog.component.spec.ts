import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMembersDialogComponent } from './club-members-dialog.component';

describe('ClubMembersDialogComponent', () => {
  let component: ClubMembersDialogComponent;
  let fixture: ComponentFixture<ClubMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubMembersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
