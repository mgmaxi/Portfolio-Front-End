import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TechnologiesList } from '../../profile-technologies/TechnologiesList';

@Component({
  selector: 'app-form-add-technologie',
  templateUrl: './form-add-technologie.component.html',
  styleUrls: ['./form-add-technologie.component.css'],
})
export class FormAddTechnologieComponent implements OnInit {
  @Output() onAddTechnologie: EventEmitter<TechnologiesList> =
    new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      type: ['', []],
      logo: ['', []],
      url: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { title, type, logo, url } = this.form.value;
      logo.length === 0
        ? (logo = 'assets/logos/technologies/logoTechnologie.png')
        : logo;
      !url.includes('https://') ? (url = 'https://' + url) : url;
      const newItem = { title, type, logo, url };
      this.onAddTechnologie.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Title() {
    return this.form.get('title');
  }

  get Type() {
    return this.form.get('type');
  }

  get Logo() {
    return this.form.get('logo');
  }

  get Url() {
    return this.form.get('url');
  }
}
