import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from 'src/app/security/service/token.service';
import { EducationService } from 'src/app/service/education.service';
import { Education } from 'src/app/models/education';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css'],
})
export class ProfileEducationComponent implements OnInit {
  @Input() person_id: any;
  isAdmin = false;
  educationList: Education[] = [];
  currentEducation: any;
  school_logo: string = '../../../assets/logos/logoEducation.png';
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;

  constructor(
    private tokenService: TokenService,
    private educationService: EducationService,
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

  toggleUpdateForm(education?: Education) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentEducation = education;
  }

  /* Services */

  getPersonId() {
    this.userService.person_id.subscribe({
      next: (data) => {
        this.person_id = data;
        this.getEducations();
      },
    });
  }

  getEducations() {
    if (this.person_id != 0) {
      this.educationService.getEducations(this.person_id).subscribe({
        next: (data) => {
          this.educationList = data;
        },
      });
    }
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
      .subscribe({
        next: (data) => {
          this.educationList.push(data);
          this.toastr.success(
            'The academic discipline "' +
              data.name +
              '" has been added to the account.',
            'Education added!',
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
      .subscribe({
        next: (data) => {
          let index = this.educationList.findIndex(
            (item) => item.id == education_id
          );
          this.educationList[index] = data;
          this.toastr.success(
            'The academic discipline"' + name + '" has been updated.',
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

  deleteEducation(education: Education) {
    let education_id = education.id;
    this.educationService
      .deleteEducation(education_id!, this.person_id)
      .subscribe({
        next: (data) => {
          let index = this.educationList.findIndex(
            (item) => item.id == education_id
          );
          this.educationList.splice(index, 1);
          this.toastr.success(
            'The academic discipline "' +
              education.name +
              '" has been deleted.',
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

  deleteAllEducationsFromPerson() {
    this.educationService
      .deleteAllEducationsFromPerson(this.person_id)
      .subscribe({
        next: (data) => {
          this.educationList.splice(0, this.educationList.length);
          this.toastr.success(
            'All academic disciplines have been eliminated.',
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
