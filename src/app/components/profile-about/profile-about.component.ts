import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/service/person.service';
import { SectionsService } from 'src/app/service/sections.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.css'],
})
export class ProfileAboutComponent implements OnInit {
  person: any = '';
  person_id: number = 1;
  showAboutSection: boolean = true;

  constructor(
    private personService: PersonService,
    private sectionsService: SectionsService
  ) {}

  ngOnInit(): void {
    this.getAbout();
    this.showAbout();
  }

  getAbout() {
    this.personService.getPersonProfile(this.person_id).subscribe((data) => {
      this.person = data;
      if (
        this.person.about.length === 0 ||
        this.person.about === null ||
        !this.person.about.trim()
      ) {
        this.showAboutSection = false;
      }
    });
  }

  showAbout() {
    this.sectionsService.showAboutSection.subscribe((data) => {
      this.showAboutSection = data;
    });
  }
}
