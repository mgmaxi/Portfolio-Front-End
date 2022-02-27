import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Language } from 'src/app/models/language';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-form-update-language',
  templateUrl: './form-update-language.component.html',
  styleUrls: ['./form-update-language.component.css'],
})
export class FormUpdateLanguageComponent implements OnInit {
  @Output() onAddLanguageToPerson: EventEmitter<number> = new EventEmitter();
  languageList: any[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages() {
    this.languageService
      .getLanguages()
      .subscribe((data) => (this.languageList = data));
  }

  addLanguageToPerson(language: Language) {
    let language_id = language.id;

    this.onAddLanguageToPerson.emit(language_id);
  }

  deleteLanguage(language: Language) {
    let language_id = language.id;
    this.languageService
      .deleteLanguage(language_id!)
      .subscribe(
        () =>
          (this.languageList = this.languageList.filter(
            (list) => list.id !== language_id
          ))
      );
  }
}
