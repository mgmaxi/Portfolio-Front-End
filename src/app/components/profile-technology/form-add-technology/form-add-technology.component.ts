import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Technology } from 'src/app/models/technology';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-form-add-technology',
  templateUrl: './form-add-technology.component.html',
  styleUrls: ['./form-add-technology.component.css'],
})
export class FormAddTechnologieComponent implements OnInit {
  @Output() onAddTechnology: EventEmitter<Technology> = new EventEmitter();
  technology_logo: any = '';
  files: any = '';
  categories = [
    { name: 'Front End', value: 'front-end' },
    { name: 'Back End', value: 'back-end' },
    { name: 'Mobile', value: 'mobile' },
    { name: 'Database', value: 'data-base' },
    { name: 'Version control', value: 'vcs' },
    { name: 'Hosting', value: 'hosting' },
    { name: 'Editing', value: 'editing' },
    { name: 'Others', value: 'other' },
  ];

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    logo: ['', []],
    url: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  uploadPhoto(event: any) {
    this.files = event.target.files;
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, category, logo, url } = this.form.value;
      !url.includes('https://') ? (url = 'https://' + url) : url;

      if (logo.length === 0) {
        logo = 'assets/logos/technologies/logoTechnologie.png';
        const newTechnology = { name, category, logo, url };
        this.onAddTechnology.emit(newTechnology);
      } else {
        // Upload image to firebase
        let reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onloadend = () => {
          this.storageService
            .uploadImage('technologies/' + name, reader.result)
            .then((urlImage) => {
              this.technology_logo = urlImage;
              const newTechnology = {
                name,
                category,
                logo: this.technology_logo,
                url,
              };
              this.onAddTechnology.emit(newTechnology);
            });
        };
      }
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
