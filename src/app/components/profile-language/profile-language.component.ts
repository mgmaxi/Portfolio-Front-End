import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  languagesList: any[] = [];
  @Input() person_id: any;
  isAdmin = false;
  showAddForm: boolean = false;
  showAddLanguageToPersonForm: boolean = false;
  showLanguageSection: boolean = true;

  constructor(
    private languageService: LanguageService,
    private tokenService: TokenService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.tokenService.isAdmin();
    this.getPersonId();
  }

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
          'El idioma "' + language.name + '" ha sido creado!',
          'Creación exitosa',
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
    this.toggleAddForm();
  }

  addLanguageToPerson(language_id: number) {
    this.languageService
      .addLanguageToPerson(this.person_id, language_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'El idioma ha sido agregado a "' + data.name + '"!',
            'Idioma agregado',
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
    this.toggleAddLanguageToPersonForm();
  }

  deleteLanguageOfPerson(language: Language) {
    let language_id = language.id;
    this.languageService
      .deleteLanguageOfPerson(this.person_id, language_id!)
      .subscribe(
        (data) => {
          this.toastr.success(
            'El idioma "' + language.name + '" ha sido eliminado de la cuenta!',
            'Eliminación exitosa',
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
  }

  deleteAllLanguagesFromPerson() {
    this.languageService.deleteAllLanguagesFromPerson(this.person_id).subscribe(
      (data) => {
        this.toastr.success(
          'Todos los idiomas han sido eliminados de la cuenta!',
          'Eliminación exitosa',
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
}
