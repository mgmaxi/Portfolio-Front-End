import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ExperienceList } from '../ExperienceList';

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
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      start_date: ['', [Validators.required]],
      end_date: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, company, description, start_date, end_date } =
        this.form.value;
      const newItem = { name, company, description, start_date, end_date };
      console.log(newItem);
      this.onAddExperience.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Name() {
    return this.form.get('name');
  }

  get Company() {
    return this.form.get('company');
  }

  get Description() {
    return this.form.get('description');
  }

  get Start_date() {
    return this.form.get('start_date');
  }

  get End_date() {
    return this.form.get('end_date');
  }
}
