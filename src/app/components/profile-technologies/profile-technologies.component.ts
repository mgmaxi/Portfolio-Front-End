import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Technology } from 'src/app/models/technology';
import { TechnologyService } from 'src/app/service/technology.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-profile-technologies',
  templateUrl: './profile-technologies.component.html',
  styleUrls: ['./profile-technologies.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  technologyList: any[] = [];
  roles: string[] = [];
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showAddTechToPersonForm: boolean = false;

  constructor(
    private tokenService: TokenService,
    private technologyService: TechnologyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getByPersonId();
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

  getByPersonId() {
    this.technologyService
      .findByPersonId(this.person_id)
      .subscribe((data) => (this.technologyList = data));
  }

  addTechnology(technology: Technology) {
    let { name, category, logo, url } = technology;
    const newTechnology = { name, category, logo, url };
    this.technologyService
      .addTechnology(newTechnology)
      .subscribe((newTechnology) => this.technologyList.push(newTechnology));
    this.toggleAddForm();
    this.refreshComponent();
    //revisar suscribe
  }

  addTechToPerson(technology_id: number) {
    this.technologyService
      .addTechnologyToPerson(this.person_id, technology_id)
      .subscribe((newTechnology) => this.technologyList.push(newTechnology));
    this.toggleAddTechToPersonForm();
    this.refreshComponent();
    //revisar suscribe
  }

  deleteTechnologyOfPerson(technology: Technology) {
    let technology_id = technology.id;
    this.technologyService
      .deleteTechnologyOfPerson(this.person_id, technology_id!)
      .subscribe(
        () =>
          (this.technologyList = this.technologyList.filter(
            (list) => list.id !== technology_id
          ))
      );
  }

  deleteAllTechnologiesFromPerson() {
    this.technologyService
      .deleteAllTechnologiesFromPerson(this.person_id)
      .subscribe(() => (this.technologyList = []));
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleAddTechToPersonForm() {
    this.showAddTechToPersonForm = !this.showAddTechToPersonForm;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }
}
