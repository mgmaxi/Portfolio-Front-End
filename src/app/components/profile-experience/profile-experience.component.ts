import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css'],
})
export class ProfileExperienceComponent implements OnInit {
  experienceList: Experience[] = [];
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;
  currentExperience: any;
  company_logo: string = '../../../assets/logos/experience/logoExperience.png';

  constructor(
    private tokenService: TokenService,
    private experienceService: ExperienceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getExperiences();
  }

  getExperiences() {
    this.experienceService.getExperiences(this.person_id).subscribe((data) => {
      this.experienceList = data;
    });
  }

  addExperience(experience: Experience) {
    let {
      name,
      company: company_id,
      description,
      start_date,
      end_date,
    } = experience;
    const newExperience = { name, description, start_date, end_date };
    this.experienceService
      .addExperience(this.person_id, company_id, newExperience)
      .subscribe(
        (data) => {
          this.toastr.success(
            'La experiencia laboral "' +
              name +
              '" ha sido agregada a la cuenta!',
            'Experiencia agregada',
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

  updateExperience(experience: Experience) {
    let {
      id: experience_id,
      name,
      company: company_id,
      description,
      start_date,
      end_date,
    } = experience;
    const updatedExperience = { name, description, start_date, end_date };
    this.experienceService
      .updateExperience(
        experience_id!,
        this.person_id,
        company_id,
        updatedExperience
      )
      .subscribe(
        (data) => {
          this.toastr.success(
            'La experiencia laboral "' + name + '" ha sido modificada!',
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

  deleteExperience(experience: Experience) {
    let experience_id = experience.id;
    this.experienceService
      .deleteExperience(experience_id!, this.person_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'La experiencia laboral "' +
              experience.name +
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

  deleteAllExperiencesFromPerson() {
    this.experienceService
      .deleteAllExperiencesFromPerson(this.person_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Todas las experiencias laborales han sido eliminadas!',
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

  toggleUpdateForm(experience?: Experience) {
    this.showUpdateForm = !this.showUpdateForm;
    this.currentExperience = experience;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }
}
