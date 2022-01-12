import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProjectsList } from '../../profile-projects/ProjectsList';

@Component({
  selector: 'app-form-add-project',
  templateUrl: './form-add-project.component.html',
  styleUrls: ['./form-add-project.component.css'],
})
export class FormAddProjectComponent implements OnInit {
  @Output() onAddProject: EventEmitter<ProjectsList> = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      technologies: ['', [Validators.required]],
      repository: ['', []],
      deploy: ['', []],
      year: ['', [Validators.required]],
      logo: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { title, technologies, repository, deploy, year, logo } =
        this.form.value;
      logo.length === 0
        ? (logo = 'assets/logos/projects/logoProject.png')
        : logo;
      !repository.includes('https://')
        ? (repository = 'https://' + repository)
        : repository;
      !deploy.includes('https://') ? (deploy = 'https://' + deploy) : deploy;
      const newItem = { title, technologies, repository, deploy, year, logo };
      this.onAddProject.emit(newItem);
      this.form.reset();
      return;
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Title() {
    return this.form.get('title');
  }

  get Technologies() {
    return this.form.get('technologies');
  }

  get Repository() {
    return this.form.get('repository');
  }

  get Deploy() {
    return this.form.get('deploy');
  }

  get Year() {
    return this.form.get('year');
  }

  get Logo() {
    return this.form.get('logo');
  }
}
