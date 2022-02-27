import { Component, OnInit } from '@angular/core';
//import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenService } from 'src/app/service/token.service';
import { EducationService } from 'src/app/service/education.service';
import { Education } from 'src/app/models/education';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css'],
})
export class ProfileEducationComponent implements OnInit {
  educationList: Education[] = [];
  roles: string[] = [];
  person_id: number = 1;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  isAdmin = false;
  currentEducation: any;

  constructor(
    private tokenService: TokenService,
    private educationService: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEducations();
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

  getEducations() {
    this.educationService
      .getEducations(this.person_id)
      .subscribe((data) => (this.educationList = data));
  }

  addEducation(education: Education) {
    let {
      name,
      description,
      start_date,
      end_date,
      school: school_id,
    } = education;
    const newEducation = { name, description, start_date, end_date };
    this.educationService
      .addEducation(this.person_id, school_id, newEducation)
      .subscribe((newEducation) => this.educationList.push(newEducation));
    this.toggleAddForm();
  }

  updateEducation(education: Education) {
    let {
      id: education_id,
      name,
      school: school_id,
      description,
      start_date,
      end_date,
    } = education;
    const updatedEducation = { name, description, start_date, end_date };
    this.educationService
      .updateEducation(
        education_id!,
        this.person_id,
        school_id,
        updatedEducation
      )
      .subscribe((updatedEducation) =>
        this.educationList.push(updatedEducation)
      );
    this.toggleUpdateForm();
    this.refreshComponent();
  }

  deleteEducation(education: Education) {
    let education_id = education.id;

    this.educationService
      .deleteEducation(education_id!, this.person_id)
      .subscribe(
        () =>
          (this.educationList = this.educationList.filter(
            (list) => list.id !== education.id
          ))
      );
  }

  deleteAllEducationsFromPerson() {
    this.educationService
      .deleteAllEducationsFromPerson(this.person_id)
      .subscribe(() => (this.educationList = []));
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(education?: Education) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentEducation = education;
    console.log(education);
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }
}
