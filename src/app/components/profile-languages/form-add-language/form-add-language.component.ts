import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Language } from 'src/app/models/language';

@Component({
  selector: 'app-form-add-language',
  templateUrl: './form-add-language.component.html',
  styleUrls: ['./form-add-language.component.css'],
})
export class FormAddLanguageComponent implements OnInit {
  @Output() onAddLanguage: EventEmitter<Language> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name } = this.form.value;
      const newLanguage = { name };
      this.onAddLanguage.emit(newLanguage);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Name() {
    return this.form.get('name');
  }
}
