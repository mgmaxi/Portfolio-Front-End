import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateHeaderComponent } from './form-update-header.component';

describe('FormUpdateHeaderComponent', () => {
  let component: FormUpdateHeaderComponent;
  let fixture: ComponentFixture<FormUpdateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
