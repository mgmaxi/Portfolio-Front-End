import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateUserphotosComponent } from './form-update-userphotos.component';

describe('FormUpdateUserphotosComponent', () => {
  let component: FormUpdateUserphotosComponent;
  let fixture: ComponentFixture<FormUpdateUserphotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateUserphotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateUserphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
