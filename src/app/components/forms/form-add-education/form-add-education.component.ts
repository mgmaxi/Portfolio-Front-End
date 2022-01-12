import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EducationList } from '../../profile-education/EducationList';

@Component({
  selector: 'app-form-add-education',
  templateUrl: './form-add-education.component.html',
  styleUrls: ['./form-add-education.component.css'],
})
export class FormAddEducationComponent implements OnInit {
  @Output() onAddEducation: EventEmitter<EducationList> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      year: ['', [Validators.required]],
      logo: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { title, description, year, logo } = this.form.value;
      logo.length === 0
        ? (logo = 'assets/logos/education/logoEducation.png')
        : logo;
      const newItem = { title, description, year, logo };
      this.onAddEducation.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Title() {
    return this.form.get('title');
  }

  get Description() {
    return this.form.get('description');
  }

  get Year() {
    return this.form.get('year');
  }

  get Logo() {
    return this.form.get('logo');
  }
}
