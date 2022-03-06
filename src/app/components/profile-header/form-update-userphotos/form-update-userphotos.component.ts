import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Userphotos } from 'src/app/models/userphotos';

@Component({
  selector: 'app-form-update-userphotos',
  templateUrl: './form-update-userphotos.component.html',
  styleUrls: ['./form-update-userphotos.component.css'],
})
export class FormUpdateUserphotosComponent implements OnInit {
  @Output() onUpdateUserphotos: EventEmitter<Userphotos> = new EventEmitter();
  @Input() currentPersonForm: any;

  form: FormGroup = this.formBuilder.group({
    profile_photo: ['', [Validators.required]],
    cover_photo: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateFormValues();
  }

  updateFormValues() {
    let { profile_photo, cover_photo } = this.currentPersonForm;
    this.form.patchValue({
      profile_photo: '',
      cover_photo: '',
    });
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { profile_photo, cover_photo } = this.form.value;
      let id = this.currentPersonForm.userphotos_id;
      const updateUserphotos = { id, profile_photo, cover_photo };
      this.onUpdateUserphotos.emit(updateUserphotos);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Profile_photo() {
    return this.form.get('profile_photo');
  }
  get Cover_photo() {
    return this.form.get('cover_photo');
  }
}
