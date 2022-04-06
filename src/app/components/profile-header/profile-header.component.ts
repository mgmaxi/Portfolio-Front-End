import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Userphotos } from 'src/app/models/userphotos';
import { PersonService } from 'src/app/service/person.service';
import { TokenService } from 'src/app/security/service/token.service';
import { UserphotosService } from 'src/app/service/userphotos.service';
import { ToastrService } from 'ngx-toastr';
import { PersonDTO } from 'src/app/models/personDTO';
import { UserService } from 'src/app/service/user.service';
import { SocialnetworkService } from 'src/app/service/socialnetwork.service';
import { Socialnetwork } from 'src/app/models/socialnetwork';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  @Output() onToggleAbout = new EventEmitter<string>();
  @Output() onToggleExperience = new EventEmitter<string>();
  @Output() onToggleEducation = new EventEmitter<string>();
  @Output() onToggleProject = new EventEmitter<string>();
  @Output() onToggleLanguage = new EventEmitter<string>();
  @Output() onToggleTechnology = new EventEmitter<string>();
  @Input() person_id: any;

  isAdmin = false;
  user_id: any;
  userphotos_id: any;
  person: any = [];
  currentPerson: any;
  socials: Socialnetwork = new Socialnetwork('', '', '');
  currentSocialnetwork: any;
  cover_photo: string = '../../../assets/image/profile/coverPhoto.png';
  profile_photo: string = '../../../assets/image/profile/profilePhoto.png';
  showUpdateForm: boolean = false;
  showUpdateProfilephotosForm: boolean = false;
  showUpdateCoverphotosForm: boolean = false;
  showUpdateSocialnetworkForm: boolean = false;

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private userphotosService: UserphotosService,
    private userService: UserService,
    private socialnetworkService: SocialnetworkService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getUserId();
    this.getPersonId();
  }

  toggleUpdateForm(person?: PersonDTO) {
    this.currentPerson = person;
    this.showUpdateForm = !this.showUpdateForm;
  }
  toggleUpdateProfilephotosForm(person?: PersonDTO) {
    this.currentPerson = person;
    this.showUpdateProfilephotosForm = !this.showUpdateProfilephotosForm;
  }

  toggleUpdateCoverphotosForm(person?: PersonDTO) {
    this.currentPerson = person;
    this.showUpdateCoverphotosForm = !this.showUpdateCoverphotosForm;
  }

  toggleUpdateSocialForm(social?: any) {
    this.currentSocialnetwork = social;
    this.showUpdateSocialnetworkForm = !this.showUpdateSocialnetworkForm;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  showAbout() {
    this.onToggleAbout.emit();
  }

  showExperience() {
    this.onToggleExperience.emit();
  }

  showEducation() {
    this.onToggleEducation.emit();
  }

  showProject() {
    this.onToggleProject.emit();
  }

  showLanguage() {
    this.onToggleLanguage.emit();
  }

  showTechnology() {
    this.onToggleTechnology.emit();
  }

  /* Services */

  getUserId() {
    let username = this.tokenService.getUsername();
    if (username === null) {
      username = 'mgmaxi';
    }
    this.userService
      .getUserId(username)
      .subscribe((data) => (this.user_id = data));
  }

  getPersonId() {
    this.userService.person_id.subscribe((data) => {
      this.person_id = data;
      this.getPersonProfile();
      this.getSocialnetworks();
    });
  }

  getPersonProfile() {
    if (this.person_id != 0) {
      this.personService.getPersonProfile(this.person_id).subscribe((data) => {
        this.person = data;
        this.userphotos_id = data.userphotos_id;
      });
    }
  }

  getSocialnetworks() {
    if (this.person_id != 0) {
      this.socialnetworkService
        .getSocialNetwork(this.person_id)
        .subscribe((data) => {
          if (data === null) {
            return;
          } else {
            this.socials = data;
          }
        });
    }
  }

  updatePerson(person: Person) {
    let {
      id: person_id,
      first_name,
      last_name,
      nationality,
      profession,
      about,
    } = person;
    const updatedPerson = {
      first_name,
      last_name,
      nationality,
      profession,
      about,
    };
    this.personService
      .updatePerson(this.user_id, person_id!, updatedPerson)
      .subscribe(
        (data) => {
          this.toastr.success(
            person.first_name + "'s data has been updated.",
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

  updateProfilephotos(profilephotos: Userphotos) {
    let { id: userphotos_id, profile_photo } = profilephotos;
    const updatedUserphotos = { profile_photo };
    this.userphotosService
      .updateUserProfilePhoto(this.user_id, userphotos_id!, updatedUserphotos)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Profile photo has been updated.',
            'Successful update!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
          this.refreshComponent();
        },
        (err) => {
          this.toastr.error(err, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    this.toggleUpdateProfilephotosForm();
  }

  updateCoverphotos(coverphotos: Userphotos) {
    let { id: userphotos_id, cover_photo } = coverphotos;
    const updatedUserphotos = { cover_photo };
    this.userphotosService
      .updateUserCoverPhoto(this.user_id, userphotos_id!, updatedUserphotos)
      .subscribe(
        (data) => {
          this.toastr.success(
            'The cover image has been updated.',
            'Successful update!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
          this.refreshComponent();
        },
        (err) => {
          this.toastr.error(err, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    this.toggleUpdateCoverphotosForm();
  }

  updateSocialnetwork(socialnetwork: Socialnetwork) {
    let { id: socialnetwork_id, linkedin, github, email } = socialnetwork;
    const updatedSocialnetwork = { linkedin, github, email };
    this.socialnetworkService
      .updateSocialNetwork(
        socialnetwork_id!,
        this.person_id,
        updatedSocialnetwork
      )
      .subscribe(
        (data) => {
          this.toastr.success(
            'Social networks have been updated.',
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
    this.toggleUpdateSocialForm();
  }
}
