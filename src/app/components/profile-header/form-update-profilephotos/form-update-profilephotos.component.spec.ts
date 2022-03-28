import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateProfilephotosComponent } from './form-update-profilephotos.component';

describe('FormUpdateUserphotosComponent', () => {
  let component: FormUpdateProfilephotosComponent;
  let fixture: ComponentFixture<FormUpdateProfilephotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUpdateProfilephotosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateProfilephotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
