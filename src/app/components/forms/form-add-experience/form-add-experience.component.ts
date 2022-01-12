import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ExperienceList } from '../../profile-experience/ExperienceList';

@Component({
  selector: 'app-form-add-experience',
  templateUrl: './form-add-experience.component.html',
  styleUrls: ['./form-add-experience.component.css'],
})
export class FormAddExperienceComponent implements OnInit {
  @Output() onAddExperience: EventEmitter<ExperienceList> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', []],
      description: ['', [Validators.required]],
      year: ['', [Validators.required]],
      logo: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { title, company, description, year, logo } = this.form.value;
      logo.length === 0
        ? (logo = 'assets/logos/experience/logoExperience.png')
        : logo;
      const newItem = { title, company, description, year, logo };
      this.onAddExperience.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Title() {
    return this.form.get('title');
  }

  get Company() {
    return this.form.get('company');
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
