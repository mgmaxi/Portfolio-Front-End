import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from 'src/app/security/service/token.service';
import { EducationService } from 'src/app/service/education.service';
import { Education } from 'src/app/models/education';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css'],
})
export class ProfileEducationComponent implements OnInit {
  @Input() person_id: any;
  educationList: Education[] = [];
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  isAdmin = false;
  currentEducation: any;
  school_logo: string = '../../../assets/logos/education/logoEducation.png';

  constructor(
    private tokenService: TokenService,
    private educationService: EducationService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getPersonId();
  }

  getPersonId() {
    this.userService.person_id.subscribe((data) => {
      this.person_id = data;
      this.getEducations();
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleUpdateForm(education?: Education) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentEducation = education;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  getEducations() {
    if (this.person_id != 0) {
      this.educationService.getEducations(this.person_id).subscribe((data) => {
        this.educationList = data;
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
      .subscribe(
        (data) => {
          this.toastr.success(
            'La disciplina académica "' +
              data.name +
              '" ha sido agregada a la cuenta!',
            'Educación agregada',
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
      .subscribe(
        (data) => {
          this.toastr.success(
            'La disciplina académica "' + name + '" ha sido modificada!',
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

  deleteEducation(education: Education) {
    let education_id = education.id;

    this.educationService
      .deleteEducation(education_id!, this.person_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'La disciplina académica "' +
              education.name +
              '" ha sido eliminada!',
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

  deleteAllEducationsFromPerson() {
    this.educationService
      .deleteAllEducationsFromPerson(this.person_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Todas las disciplinas académicas han sido eliminadas!',
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
}
