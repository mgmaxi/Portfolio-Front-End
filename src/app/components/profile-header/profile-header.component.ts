import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Userphotos } from 'src/app/models/userphotos';
import { PersonService } from 'src/app/service/person.service';
import { TokenService } from 'src/app/security/service/token.service';
import { UserphotosService } from 'src/app/service/userphotos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  person: any = [];
  isAdmin = false;
  showUpdateForm: boolean = false;
  showUpdateUserphotosForm: boolean = false;
  person_id: any = 1;
  user_id: any = 1;
  userphotos_id: any = 1;
  cover_photo: string = '../../../assets/image/profile/profileCover.jpg';
  profile_photo: string = '../../../assets/image/profile/profileCover.jpg';

  @Output() onToggleAbout = new EventEmitter<string>();
  @Output() onToggleExperience = new EventEmitter<string>();
  @Output() onToggleEducation = new EventEmitter<string>();
  @Output() onToggleProject = new EventEmitter<string>();
  @Output() onToggleLanguage = new EventEmitter<string>();
  @Output() onToggleTechnology = new EventEmitter<string>();

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

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private userphotosService: UserphotosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getPersonProfile();
  }

  getPersonProfile() {
    this.personService
      .getPersonProfile(this.person_id)
      .subscribe((data) => (this.person = data));
  }

  updatePerson(person: Person) {
    let { id: person_id, name, nationality, profession, about } = person;
    const updatedPerson = { name, nationality, profession, about };
    this.personService
      .updatePerson(this.user_id, person_id!, updatedPerson)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Los datos de "' + person.name + '" han sido modificados!',
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

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }
  toggleUpdateUserphotosForm() {
    this.showUpdateUserphotosForm = !this.showUpdateUserphotosForm;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }
}
