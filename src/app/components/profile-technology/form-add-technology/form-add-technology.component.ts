import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Technology } from 'src/app/models/technology';

@Component({
  selector: 'app-form-add-technology',
  templateUrl: './form-add-technology.component.html',
  styleUrls: ['./form-add-technology.component.css'],
})
export class FormAddTechnologieComponent implements OnInit {
  @Output() onAddTechnology: EventEmitter<Technology> = new EventEmitter();
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    logo: ['', []],
    url: ['', []],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, category, logo, url } = this.form.value;
      logo.length === 0
        ? (logo = 'assets/logos/technologies/logoTechnologie.png')
        : logo;
      !url.includes('https://') ? (url = 'https://' + url) : url;
      const newTechnology = { name, category, logo, url };
      this.onAddTechnology.emit(newTechnology);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Name() {
    return this.form.get('name');
  }

  get Category() {
    return this.form.get('category');
  }

  get Logo() {
    return this.form.get('logo');
  }

  get Url() {
    return this.form.get('url');
  }
}
