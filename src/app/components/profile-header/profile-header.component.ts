import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Userphotos } from 'src/app/models/userphotos';
import { PersonService } from 'src/app/service/person.service';
import { TokenService } from 'src/app/service/token.service';
import { UserphotosService } from 'src/app/service/userphotos.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  header: any = null;
  roles: string[] = [];
  isAdmin = false;
  showUpdateForm: boolean = false;
  showUpdateUserphotosForm: boolean = false;
  person_id: any = 1;
  user_id: any = 1;
  userphotos_id: any = 1;
  cover_photo: string = '../../../assets/image/profile/profileCover.jpg';
  profile_photo: string = '../../../assets/image/profile/profileCover.jpg';

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private userphotosService: UserphotosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getPersonProfile();
  }

  getRoles() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getPersonProfile() {
    this.personService
      .getPersonProfile(this.person_id)
      .subscribe((data) => (this.header = data));
  }

  updatePerson(person: Person) {
    let { id: person_id, name, nationality, profession, about } = person;
    const updatedPerson = { name, nationality, profession, about };
    this.personService
      .updatePerson(this.user_id, person_id!, updatedPerson)
      .subscribe((updatedPerson) => this.header.push(updatedPerson));
    this.toggleUpdateForm();
    this.refreshComponent();
  }

  updateUserphotos(userphotos: Userphotos) {
    console.log(userphotos);
    let { id: userphotos_id, profile_photo, cover_photo } = userphotos;
    const updatedUserphotos = { profile_photo, cover_photo };
    this.userphotosService
      .updateUserphotos(this.user_id, userphotos_id!, updatedUserphotos)
      // header.push reemplaza los datos de updatePerson name, nationality, etc
      .subscribe((updatedUserphotos) => this.header.push(updatedUserphotos));
    this.toggleUpdateUserphotosForm();
    this.refreshComponent();
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
