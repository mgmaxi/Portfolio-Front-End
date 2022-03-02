import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Userphotos } from 'src/app/models/userphotos';
import { PersonService } from 'src/app/service/person.service';
import { TokenService } from 'src/app/security/service/token.service';
import { UserphotosService } from 'src/app/service/userphotos.service';
import { SectionsService } from 'src/app/service/sections.service';
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
  showAboutSection: boolean = true;
  showExperienceSection: boolean = true;
  showEducationSection: boolean = true;
  showProjectSection: boolean = true;
  showLanguageSection: boolean = true;
  showTechnologySection: boolean = true;

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private userphotosService: UserphotosService,
    private sectionsService: SectionsService,
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

  showAbout() {
    this.showAboutSection = !this.showAboutSection;
    this.sectionsService.showAbout(this.showAboutSection);
  }

  showExperience() {
    this.showExperienceSection = !this.showExperienceSection;
    this.sectionsService.showExperience(this.showExperienceSection);
  }
  showEducation() {
    this.showEducationSection = !this.showEducationSection;
    this.sectionsService.showEducation(this.showEducationSection);
  }
  showProject() {
    this.showProjectSection = !this.showProjectSection;
    this.sectionsService.showProject(this.showProjectSection);
  }
  showLanguage() {
    this.showLanguageSection = !this.showLanguageSection;
    this.sectionsService.showLanguage(this.showLanguageSection);
  }
  showTechnology() {
    this.showTechnologySection = !this.showTechnologySection;
    this.sectionsService.showTechnology(this.showTechnologySection);
  }
}
