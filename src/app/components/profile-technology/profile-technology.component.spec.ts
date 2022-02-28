import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTechnologiesComponent } from './profile-technology.component';

describe('ProfileTechnologiesComponent', () => {
  let component: ProfileTechnologiesComponent;
  let fixture: ComponentFixture<ProfileTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileTechnologiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
