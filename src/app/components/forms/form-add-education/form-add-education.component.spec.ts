import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddEducationComponent } from './form-add-education.component';

describe('FormAddEducationComponent', () => {
  let component: FormAddEducationComponent;
  let fixture: ComponentFixture<FormAddEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
