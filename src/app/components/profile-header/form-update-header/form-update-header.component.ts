import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-form-update-header',
  templateUrl: './form-update-header.component.html',
  styleUrls: ['./form-update-header.component.css'],
})
export class FormUpdateHeaderComponent implements OnInit {
  @Output() onUpdatePerson: EventEmitter<Person> = new EventEmitter();
  @Input() currentPersonForm: any;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    nationality: ['', [Validators.required]],
    profession: ['', [Validators.required]],
    about: ['', []],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateFormValues();
  }

  updateFormValues() {
    let { name, nationality, profession, about } = this.currentPersonForm;
    this.form.patchValue({
      name: name,
      nationality: nationality,
      profession: profession,
      about: about,
    });
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, nationality, profession, about } = this.form.value;
      let id = this.currentPersonForm.id;
      const updatedPerson = {
        id,
        name,
        nationality,
        profession,
        about,
      };
      this.onUpdatePerson.emit(updatedPerson);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Name() {
    return this.form.get('name');
  }

  get Nationality() {
    return this.form.get('nationality');
  }

  get Profession() {
    return this.form.get('profession');
  }

  get About() {
    return this.form.get('about');
  }
}
