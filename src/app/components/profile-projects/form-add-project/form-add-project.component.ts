import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-form-add-project',
  templateUrl: './form-add-project.component.html',
  styleUrls: ['./form-add-project.component.css'],
})
export class FormAddProjectComponent implements OnInit {
  @Output() onAddProject: EventEmitter<Project> = new EventEmitter();
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
      repository: ['', []],
      deploy: ['', []],
      end_date: ['', [Validators.required]],
      logo: ['', []],
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, description, repository, deploy, end_date, logo } =
        this.form.value;
      logo.length === 0
        ? (logo = 'assets/logos/projects/logoProject.png')
        : logo;
      !repository.includes('https://')
        ? (repository = 'https://' + repository)
        : repository;
      !deploy.includes('https://') ? (deploy = 'https://' + deploy) : deploy;
      const newProject = {
        name,
        description,
        repository,
        deploy,
        end_date,
        logo,
      };
      this.onAddProject.emit(newProject);
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

  get Repository() {
    return this.form.get('repository');
  }

  get Deploy() {
    return this.form.get('deploy');
  }

  get End_date() {
    return this.form.get('end_date');
  }

  get Logo() {
    return this.form.get('logo');
  }
}
