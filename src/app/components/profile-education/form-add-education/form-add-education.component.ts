import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-education',
  templateUrl: './form-add-education.component.html',
  styleUrls: ['./form-add-education.component.css'],
})
export class FormAddEducationComponent implements OnInit {
  @Output() onAddEducation: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ],
      ],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      school: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, description, start_date, end_date, school } = this.form.value;

      const newEducation = { name, description, start_date, end_date, school };
      this.onAddEducation.emit(newEducation);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Name() {
    return this.form.get('name');
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

  get School() {
    return this.form.get('school');
  }
}
