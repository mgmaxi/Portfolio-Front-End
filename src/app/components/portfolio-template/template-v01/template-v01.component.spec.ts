import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateV01Component } from './template-v01.component';

describe('TemplateV01Component', () => {
  let component: TemplateV01Component;
  let fixture: ComponentFixture<TemplateV01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateV01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateV01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
