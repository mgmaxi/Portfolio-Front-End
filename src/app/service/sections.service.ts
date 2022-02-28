import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private showAboutSource = new BehaviorSubject<boolean>(true);
  private showExperienceSource = new BehaviorSubject<boolean>(true);
  private showEducationSource = new BehaviorSubject<boolean>(true);
  private showProjectSource = new BehaviorSubject<boolean>(true);
  private showLanguageSource = new BehaviorSubject<boolean>(true);
  private showTechnologySource = new BehaviorSubject<boolean>(true);

  showAboutSection = this.showAboutSource.asObservable();
  showExperienceSection = this.showExperienceSource.asObservable();
  showEducationSection = this.showEducationSource.asObservable();
  showProjectSection = this.showProjectSource.asObservable();
  showLanguageSection = this.showLanguageSource.asObservable();
  showTechnologySection = this.showTechnologySource.asObservable();
  constructor() {}

  showAbout(showAboutSection: boolean) {
    this.showAboutSource.next(showAboutSection);
  }
  showExperience(showExperienceSection: boolean) {
    this.showExperienceSource.next(showExperienceSection);
  }
  showEducation(showEducationSection: boolean) {
    this.showEducationSource.next(showEducationSection);
  }
  showProject(showProjectSection: boolean) {
    this.showProjectSource.next(showProjectSection);
  }
  showLanguage(showLanguageSection: boolean) {
    this.showLanguageSource.next(showLanguageSection);
  }
  showTechnology(showTechnologySection: boolean) {
    this.showTechnologySource.next(showTechnologySection);
  }
}
