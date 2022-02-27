import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEducationComponent } from './form-update-education.component';

describe('FormUpdateEducationComponent', () => {
  let component: FormUpdateEducationComponent;
  let fixture: ComponentFixture<FormUpdateEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
