import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LanguagesList } from '../../profile-languages/LanguagesList';

@Component({
  selector: 'app-form-add-language',
  templateUrl: './form-add-language.component.html',
  styleUrls: ['./form-add-language.component.css'],
})
export class FormAddLanguageComponent implements OnInit {
  @Output() onAddLanguage: EventEmitter<LanguagesList> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { title, level } = this.form.value;
      const newItem = { title, level };
      this.onAddLanguage.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Title() {
    return this.form.get('title');
  }

  get Level() {
    return this.form.get('level');
  }
}
