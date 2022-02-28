import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddTechToPersonComponent } from './add-technology-to-person.component';

describe('FormAddTechToPersonComponent', () => {
  let component: FormAddTechToPersonComponent;
  let fixture: ComponentFixture<FormAddTechToPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAddTechToPersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddTechToPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
