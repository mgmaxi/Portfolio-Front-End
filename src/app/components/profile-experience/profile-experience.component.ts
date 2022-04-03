import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/security/service/token.service';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css'],
})
export class ProfileExperienceComponent implements OnInit {
  @Input() person_id: any;
  isAdmin = false;
  experienceList: Experience[] = [];
  currentExperience: any;
  company_logo: string = '../../../assets/logos/experience/logoExperience.png';
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;

  constructor(
    private tokenService: TokenService,
    private experienceService: ExperienceService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getPersonId();
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
        this.router.navigate(['profile']);
      });
  }

  /* Services */

  getPersonId() {
    this.userService.person_id.subscribe((data) => {
      this.person_id = data;
      this.getExperiences();
    });
  }

  getExperiences() {
    if (this.person_id != 0) {
      this.experienceService
        .getExperiences(this.person_id)
        .subscribe((data) => {
          this.experienceList = data;
        });
    }
  }

  addExperience(experience: Experience) {
    let {
      name,
      company: company_id,
      description,
      start_date,
      end_date,
      is_current,
    } = experience;
    const newExperience = {
      name,
      description,
      start_date,
      end_date,
      is_current,
    };
    this.experienceService
      .addExperience(this.person_id, company_id, newExperience)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Work experience "' + name + '" has been added to the account.',
            'Experience added!',
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
      is_current,
    } = experience;
    const updatedExperience = {
      name,
      description,
      start_date,
      end_date,
      is_current,
    };
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
            'Work experience "' + name + '" has been updated.',
            'Successful update!',
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
            'Work experience "' + experience.name + '" has been deleted.',
            'Successful delete!',
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
            'All work experiences have been deleted.',
            'Successful delete!',
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
