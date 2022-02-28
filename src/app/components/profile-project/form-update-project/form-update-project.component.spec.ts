import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateProjectComponent } from './form-update-project.component';

describe('FormUpdateProjectComponent', () => {
  let component: FormUpdateProjectComponent;
  let fixture: ComponentFixture<FormUpdateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
