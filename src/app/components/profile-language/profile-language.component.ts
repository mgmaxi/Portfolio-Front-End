import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'src/app/models/language';
import { LanguageService } from 'src/app/service/language.service';
import { SectionsService } from 'src/app/service/sections.service';
import { TokenService } from 'src/app/security/service/token.service';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.css'],
})
export class ProfileLanguagesComponent implements OnInit {
  languagesList: any[] = [];
  roles: string[] = [];
  person_id: number = 1;
  isAdmin = false;
  showAddForm: boolean = false;
  showAddLanguageToPersonForm: boolean = false;
  showLanguageSection: boolean = true;

  constructor(
    private languageService: LanguageService,
    private tokenService: TokenService,
    private sectionsService: SectionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getByPersonId();
    this.getRoles();
    this.showLanguage();
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
    this.languageService.findByPersonId(this.person_id).subscribe((data) => {
      this.languagesList = data;
      if (this.languagesList.length === 0) {
        this.showLanguageSection = false;
      }
    });
  }

  addLanguage(language: Language) {
    this.languageService
      .addLanguage(language)
      .subscribe((language) => this.languagesList.push(language));
    this.toggleAddForm();
    this.refreshComponent();
  }

  addLanguageToPerson(language_id: number) {
    this.languageService
      .addLanguageToPerson(this.person_id, language_id)
      .subscribe((newLanguage) => this.languagesList.push(newLanguage));
    this.toggleAddLanguageToPersonForm();
    this.refreshComponent();
    //revisar suscribe
  }

  deleteLanguageOfPerson(language: Language) {
    let language_id = language.id;
    this.languageService
      .deleteLanguageOfPerson(this.person_id, language_id!)
      .subscribe(
        () =>
          (this.languagesList = this.languagesList.filter(
            (list) => list.id !== language_id
          ))
      );
  }

  deleteAllLanguagesFromPerson() {
    this.languageService
      .deleteAllLanguagesFromPerson(this.person_id)
      .subscribe(() => {
        this.languagesList = [];
        this.refreshComponent();
      });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleAddLanguageToPersonForm(language?: Language) {
    this.showAddLanguageToPersonForm = !this.showAddLanguageToPersonForm;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['portfolio']);
      });
  }

  showLanguage() {
    this.sectionsService.showLanguageSection.subscribe((data) => {
      this.showLanguageSection = data;
    });
  }
}
