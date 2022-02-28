import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLanguagesComponent } from './profile-language.component';

describe('ProfileLanguagesComponent', () => {
  let component: ProfileLanguagesComponent;
  let fixture: ComponentFixture<ProfileLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileLanguagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
