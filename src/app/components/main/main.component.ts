import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/service/person.service';
import { ExperienceService } from 'src/app/service/experience.service';
import { EducationService } from 'src/app/service/education.service';
import { ProjectService } from 'src/app/service/project.service';
import { LanguageService } from 'src/app/service/language.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  person_id: number = 1;
  showAbout = true;
  showExperience = true;
  showEducation = true;
  showProject = true;
  showLanguage = true;
  showTechnology = true;

  constructor(
    private personService: PersonService,
    private experienceService: ExperienceService,
    private educationService: EducationService,
    private projectService: ProjectService,
    private languageService: LanguageService,
    private technologyService: TechnologyService
  ) {}

  ngOnInit(): void {
    this.AboutIsEmpty();
    this.ExperienceIsEmpty();
    this.EducationIsEmpty();
    this.ProjectIsEmpty();
    this.LanguageIsEmpty();
    this.TechnologyIsEmpty();
  }

  private AboutIsEmpty() {
    this.personService.getPersonProfile(this.person_id).subscribe((data) => {
      let person: any = data;
      person.about.length === 0
        ? (this.showAbout = false)
        : (this.showAbout = true);
    });
  }

  toggleAbout() {
    this.showAbout = !this.showAbout;
  }

  private ExperienceIsEmpty() {
    this.experienceService.getExperiences(this.person_id).subscribe((data) => {
      data.length === 0
        ? (this.showExperience = false)
        : (this.showExperience = true);
    });
  }

  toggleExperience() {
    this.showExperience = !this.showExperience;
  }

  private EducationIsEmpty() {
    this.educationService.getEducations(this.person_id).subscribe((data) => {
      data.length === 0
        ? (this.showEducation = false)
        : (this.showEducation = true);
    });
  }

  toggleEducation() {
    this.showEducation = !this.showEducation;
  }

  private ProjectIsEmpty() {
    this.projectService.getProjects(this.person_id).subscribe((data) => {
      data.length === 0
        ? (this.showProject = false)
        : (this.showProject = true);
    });
  }

  toggleProject() {
    this.showProject = !this.showProject;
  }

  private LanguageIsEmpty() {
    this.languageService.findByPersonId(this.person_id).subscribe((data) => {
      data.length === 0
        ? (this.showLanguage = false)
        : (this.showLanguage = true);
    });
  }

  toggleLanguage() {
    this.showLanguage = !this.showLanguage;
  }

  private TechnologyIsEmpty() {
    this.technologyService.findByPersonId(this.person_id).subscribe((data) => {
      data.length === 0
        ? (this.showTechnology = false)
        : (this.showTechnology = true);
    });
  }

  toggleTechnology() {
    this.showTechnology = !this.showTechnology;
  }
}
