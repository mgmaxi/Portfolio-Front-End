import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperienceComponent } from './profile-experience.component';

describe('ProfileExperienceComponent', () => {
  let component: ProfileExperienceComponent;
  let fixture: ComponentFixture<ProfileExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
