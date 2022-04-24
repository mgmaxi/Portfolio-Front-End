import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-project',
  templateUrl: './profile-project.component.html',
  styleUrls: ['./profile-project.component.css'],
})
export class ProfileProjectsComponent implements OnInit {
  @Input() person_id: any;
  isAdmin = false;
  projectList: any[] = [];
  currentProject: any;
  project_logo: string = '../../../assets/logos/logoProject.png';
  showForm: boolean = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;

  constructor(
    private tokenService: TokenService,
    private projectService: ProjectService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getPersonId();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(project?: Project) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentProject = project;
  }

  /* Services */

  getPersonId() {
    this.userService.person_id.subscribe({
      next: (data) => {
        this.person_id = data;
        this.getProjects();
      },
    });
  }

  getProjects() {
    if (this.person_id != 0) {
      this.projectService.getProjects(this.person_id).subscribe({
        next: (data) => {
          this.projectList = data;
        },
      });
    }
  }

  addProject(project: Project) {
    this.projectService.addProject(this.person_id, project).subscribe({
      next: (data) => {
        this.projectList.push(data);
        this.toastr.success(
          'The project "' + project.name + '" has been added to the account.',
          'Project added!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
    this.toggleAddForm();
  }

  updateProject(project: Project) {
    let {
      id: project_id,
      name,
      description,
      repository,
      deploy,
      end_date,
      logo,
    } = project;
    const updatedProject = {
      name,
      description,
      repository,
      deploy,
      end_date,
      logo,
    };

    this.projectService
      .updateProject(project_id!, this.person_id, updatedProject)
      .subscribe({
        next: (data) => {
          let index = this.projectList.findIndex(
            (item) => item.id == project_id
          );
          this.projectList[index] = data;
          this.toastr.success(
            'The project "' + name + '" has been updated.',
            'Successful update!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
      });
    this.toggleUpdateForm();
  }

  deleteProject(project: Project) {
    let project_id = project.id;
    this.projectService.deleteProject(project_id!, this.person_id).subscribe({
      next: (data) => {
        let index = this.projectList.findIndex((item) => item.id == project_id);
        this.projectList.splice(index, 1);
        this.toastr.success(
          'The project "' + project.name + '" has been deleted.',
          'Successful delete!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  deleteAllProjectsFromPerson() {
    this.projectService.deleteAllProjectsFromPerson(this.person_id).subscribe({
      next: (data) => {
        this.projectList.splice(0, this.projectList.length);
        this.toastr.success(
          'All the projects have been deleted.',
          'Successful delete!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
}
