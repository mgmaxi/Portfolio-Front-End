import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateExperienceComponent } from './form-update-experience.component';

describe('FormUpdateExperienceComponent', () => {
  let component: FormUpdateExperienceComponent;
  let fixture: ComponentFixture<FormUpdateExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
