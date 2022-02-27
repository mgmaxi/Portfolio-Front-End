import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.css'],
})
export class ProfileProjectsComponent implements OnInit {
  projectList: any[] = [];
  showForm: boolean = false;
  person_id: number = 1;
  roles: string[] = [];
  isAdmin = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  currentProject: any;

  constructor(
    private tokenService: TokenService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getRoles();
  }

  getRoles() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getProjects() {
    this.projectService
      .getProjects(this.person_id)
      .subscribe((data) => (this.projectList = data));
  }

  addProject(project: Project) {
    this.projectService
      .addProject(this.person_id, project)
      .subscribe((newProject) => this.projectList.push(newProject));
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
      .subscribe((updatedProject) => this.projectList.push(updatedProject));
    this.toggleUpdateForm();
    this.refreshComponent();
  }

  deleteItem(project: Project) {
    let project_id = project.id;
    this.projectService
      .deleteProject(project_id!, this.person_id)
      .subscribe(
        () =>
          (this.projectList = this.projectList.filter(
            (list) => list.id !== project.id
          ))
      );
  }

  deleteAllProjectsFromPerson() {
    this.projectService
      .deleteAllProjectsFromPerson(this.person_id)
      .subscribe(() => (this.projectList = []));
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
