import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Education } from 'src/app/models/education';

@Component({
  selector: 'app-form-update-education',
  templateUrl: './form-update-education.component.html',
  styleUrls: ['./form-update-education.component.css'],
})
export class FormUpdateEducationComponent implements OnInit {
  @Output() onUpdateEducation: EventEmitter<Education> = new EventEmitter();
  @Input() currentEducationForm: any;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      school: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ],
      ],
      start_date: ['', [Validators.required]],
      end_date: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, school, description, start_date, end_date } = this.form.value;
      let id = this.currentEducationForm.id;
      const updatedEducation = {
        id,
        name,
        school,
        description,
        start_date,
        end_date,
      };
      this.onUpdateEducation.emit(updatedEducation);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Name() {
    return this.form.get('name');
  }

  get School() {
    return this.form.get('school');
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
