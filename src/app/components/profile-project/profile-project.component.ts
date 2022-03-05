import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-project',
  templateUrl: './profile-project.component.html',
  styleUrls: ['./profile-project.component.css'],
})
export class ProfileProjectsComponent implements OnInit {
  projectList: any[] = [];
  showForm: boolean = false;
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  currentProject: any;

  constructor(
    private tokenService: TokenService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects(this.person_id).subscribe((data) => {
      this.projectList = data;
    });
  }

  addProject(project: Project) {
    this.projectService.addProject(this.person_id, project).subscribe(
      (data) => {
        this.toastr.success(
          'El proyecto "' + project.name + '" ha sido agregado a la cuenta!',
          'Proyecto agregado',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
        this.refreshComponent();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
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
      .subscribe(
        (data) => {
          this.toastr.success(
            'El proyecto "' + name + '" ha sido modificado!',
            'Modificación exitosa',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
          this.refreshComponent();
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    this.toggleUpdateForm();
  }

  deleteProject(project: Project) {
    let project_id = project.id;
    this.projectService.deleteProject(project_id!, this.person_id).subscribe(
      (data) => {
        this.toastr.success(
          'El proyecto "' + project.name + '" ha sido eliminado!',
          'Eliminación exitosa',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
        this.refreshComponent();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  deleteAllProjectsFromPerson() {
    this.projectService.deleteAllProjectsFromPerson(this.person_id).subscribe(
      (data) => {
        this.toastr.success(
          'Todos los proyectos han sido eliminados!',
          'Eliminación exitosa',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
        this.refreshComponent();
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(project?: Project) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentProject = project;
    console.log(project);
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }
}
