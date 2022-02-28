import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddTechnologieComponent } from './form-add-technology.component';

describe('FormAddTechnologieComponent', () => {
  let component: FormAddTechnologieComponent;
  let fixture: ComponentFixture<FormAddTechnologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAddTechnologieComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddTechnologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
