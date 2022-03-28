import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateCoverphotoComponent } from './form-update-coverphoto.component';

describe('FormUpdateCoverphotoComponent', () => {
  let component: FormUpdateCoverphotoComponent;
  let fixture: ComponentFixture<FormUpdateCoverphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateCoverphotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateCoverphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
