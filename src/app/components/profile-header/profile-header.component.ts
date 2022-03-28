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

  person: any = [];
  currentPerson: any;
  socials: Socialnetwork = new Socialnetwork('', '', '');
  currentSocialnetwork: any;
  isAdmin = false;
  showUpdateForm: boolean = false;
  showUpdateUserphotosForm: boolean = false;
  showUpdateSocialnetworkForm: boolean = false;
  user_id: any;
  userphotos_id: any;
  cover_photo: string = '../../../assets/image/profile/profileCover.jpg';
  profile_photo: string = '../../../assets/image/profile/profileCover.jpg';

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

  getUserId() {
    const username = this.tokenService.getUsername();
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
          this.socials = data;
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
            'Los datos de "' + person.first_name + '" han sido modificados!',
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

  updateUserphotos(userphotos: Userphotos) {
    let { id: userphotos_id, profile_photo, cover_photo } = userphotos;
    const updatedUserphotos = { profile_photo, cover_photo };
    this.userphotosService
      .updateUserphotos(this.user_id, userphotos_id!, updatedUserphotos)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Las imágenes han sido modificadas!',
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
    this.toggleUpdateUserphotosForm();
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
            'Las redes sociales han sido modificadas!',
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
    this.toggleUpdateSocialForm();
  }

  toggleUpdateForm(person?: PersonDTO) {
    this.currentPerson = person;
    this.showUpdateForm = !this.showUpdateForm;
  }
  toggleUpdateUserphotosForm(person?: PersonDTO) {
    this.currentPerson = person;
    this.showUpdateUserphotosForm = !this.showUpdateUserphotosForm;
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
}
