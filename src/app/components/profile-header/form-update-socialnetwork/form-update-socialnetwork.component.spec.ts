import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateSocialnetworkComponent } from './form-update-socialnetwork.component';

describe('FormUpdateSocialnetworkComponent', () => {
  let component: FormUpdateSocialnetworkComponent;
  let fixture: ComponentFixture<FormUpdateSocialnetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdateSocialnetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateSocialnetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
