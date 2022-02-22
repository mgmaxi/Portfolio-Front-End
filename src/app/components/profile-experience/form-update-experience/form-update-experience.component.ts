import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ExperienceList } from '../../profile-experience/ExperienceList';

@Component({
  selector: 'app-form-update-experience',
  templateUrl: './form-update-experience.component.html',
  styleUrls: ['./form-update-experience.component.css'],
})
export class FormUpdateExperienceComponent implements OnInit {
  @Output() onUpdateExperience: EventEmitter<ExperienceList> =
    new EventEmitter();
  @Input() currentExperienceForm: any;
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
      let id = this.currentExperienceForm.id;
      const updatedExperience = {
        id,
        name,
        company,
        description,
        start_date,
        end_date,
      };
      this.onUpdateExperience.emit(updatedExperience);
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
