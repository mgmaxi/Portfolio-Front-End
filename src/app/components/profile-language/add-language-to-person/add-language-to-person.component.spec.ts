import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateLanguageComponent } from './add-language-to-person.component';

describe('FormUpdateLanguageComponent', () => {
  let component: FormUpdateLanguageComponent;
  let fixture: ComponentFixture<FormUpdateLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUpdateLanguageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
