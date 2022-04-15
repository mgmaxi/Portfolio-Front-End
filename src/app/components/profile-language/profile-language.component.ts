import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'src/app/models/language';
import { LanguageService } from 'src/app/service/language.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.css'],
})
export class ProfileLanguagesComponent implements OnInit {
  @Input() person_id: any;
  isAdmin = false;
  languagesList: any[] = [];
  showAddForm: boolean = false;
  showAddLanguageToPersonForm: boolean = false;
  showLanguageSection: boolean = true;

  constructor(
    private languageService: LanguageService,
    private tokenService: TokenService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getPersonId();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  toggleAddLanguageToPersonForm(language?: Language) {
    this.showAddLanguageToPersonForm = !this.showAddLanguageToPersonForm;
  }

  /* Services */

  getPersonId() {
    this.userService.person_id.subscribe((data) => {
      this.person_id = data;
      this.getLanguages();
    });
  }

  getLanguages() {
    if (this.person_id != 0) {
      this.languageService.findByPersonId(this.person_id).subscribe((data) => {
        this.languagesList = data;
      });
    }
  }

  addLanguage(language: Language) {
    this.languageService.addLanguage(language).subscribe(
      (data) => {
        this.toastr.success(
          language.name + ' language has been created.',
          'Successful creation!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
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

  addLanguageToPerson(language_id: number) {
    this.languageService
      .addLanguageToPerson(this.person_id, language_id)
      .subscribe(
        (data) => {
          this.languagesList.push(data.languages[data.languages.length - 1]);
          this.toastr.success(
            'The language has been added to "' + data.name + '".',
            'Language added!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    this.toggleAddLanguageToPersonForm();
  }

  deleteLanguageOfPerson(language: Language) {
    let language_id = language.id;
    this.languageService
      .deleteLanguageOfPerson(this.person_id, language_id!)
      .subscribe(
        (data) => {
          let index = this.languagesList.findIndex(
            (item) => item.id == language_id
          );
          this.languagesList.splice(index, 1);
          this.toastr.success(
            language.name + ' language has been removed from the account.',
            'Successful delete!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
  }

  deleteAllLanguagesFromPerson() {
    this.languageService.deleteAllLanguagesFromPerson(this.person_id).subscribe(
      (data) => {
        this.languagesList.splice(0, this.languagesList.length);
        this.toastr.success(
          'All languages ​​have been removed from the account.',
          'Successful delete!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
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
