import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-form-update-project',
  templateUrl: './form-update-project.component.html',
  styleUrls: ['./form-update-project.component.css'],
})
export class FormUpdateProjectComponent implements OnInit {
  @Output() onUpdateProject: EventEmitter<Project> = new EventEmitter();
  @Input() currentProjectForm: any;

  form: FormGroup = this.formBuilder.group({
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateFormValues();
  }

  updateFormValues() {
    let { name, description, repository, deploy, end_date, logo } =
      this.currentProjectForm;
    this.form.patchValue({
      name: name,
      description: description,
      school: repository,
      start_date: deploy,
      end_date: end_date,
      logo: '',
    });
  }

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
      let id = this.currentProjectForm.id;
      const updatedProject = {
        id,
        name,
        description,
        repository,
        deploy,
        end_date,
        logo,
      };
      this.onUpdateProject.emit(updatedProject);
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
