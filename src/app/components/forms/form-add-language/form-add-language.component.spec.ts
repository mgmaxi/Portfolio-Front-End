import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddLanguagesComponent } from './form-add-language.component';

describe('FormAddLanguagesComponent', () => {
  let component: FormAddLanguagesComponent;
  let fixture: ComponentFixture<FormAddLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAddLanguagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
