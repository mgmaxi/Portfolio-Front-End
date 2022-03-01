import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Technology } from 'src/app/models/technology';
import { SectionsService } from 'src/app/service/sections.service';
import { TechnologyService } from 'src/app/service/technology.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-profile-technology',
  templateUrl: './profile-technology.component.html',
  styleUrls: ['./profile-technology.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  technologyList: any[] = [];
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showAddTechToPersonForm: boolean = false;
  showTechnologySection: boolean = true;

  constructor(
    private tokenService: TokenService,
    private technologyService: TechnologyService,
    private sectionsService: SectionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getByPersonId();
    this.showTechnology();
  }

  getByPersonId() {
    this.technologyService.findByPersonId(this.person_id).subscribe((data) => {
      this.technologyList = data;
      if (this.technologyList.length === 0) {
        this.showTechnologySection = false;
      }
    });
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
      .subscribe(() => {
        this.technologyList = [];
        this.refreshComponent();
      });
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

  showTechnology() {
    this.sectionsService.showTechnologySection.subscribe((data) => {
      this.showTechnologySection = data;
    });
  }
}
