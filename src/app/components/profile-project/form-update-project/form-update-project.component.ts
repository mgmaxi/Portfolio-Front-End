import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { StorageService } from 'src/app/service/storage.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-form-update-project',
  templateUrl: './form-update-project.component.html',
  styleUrls: ['./form-update-project.component.css'],
})
export class FormUpdateProjectComponent implements OnInit {
  @Output() onUpdateProject: EventEmitter<Project> = new EventEmitter();
  @Input() currentProjectForm: any;
  project_logo: any = '';
  files: any = '';
  username: string = '';

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150),
      ],
    ],
    repository: ['', []],
    deploy: ['', []],
    end_date: ['', [Validators.required]],
    logo: ['', []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUsername();
    this.updateFormValues();
  }
  getUsername() {
    this.username = this.tokenService.getUsername();
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

  uploadPhoto(event: any) {
    this.files = event.target.files;
  }

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let { name, description, repository, deploy, end_date, logo } =
        this.form.value;
      let id = this.currentProjectForm.id;

      !repository.includes('https://')
        ? (repository = 'https://' + repository)
        : repository;
      !deploy.includes('https://') ? (deploy = 'https://' + deploy) : deploy;

      if (logo.length === 0) {
        const newProject = {
          id,
          name,
          description,
          repository,
          deploy,
          end_date,
          logo,
        };
        this.onUpdateProject.emit(newProject);
      } else {
        /* Upload logo to firebase */
        let reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onloadend = () => {
          this.storageService
            .uploadImage(
              'users/' + this.username + '/projects/' + name,
              reader.result
            )
            .then((urlImage) => {
              this.project_logo = urlImage;
              const newProject = {
                id,
                name,
                description,
                repository,
                deploy,
                end_date,
                logo: this.project_logo,
              };
              this.onUpdateProject.emit(newProject);
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
