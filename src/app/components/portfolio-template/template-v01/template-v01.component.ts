import { Component, OnInit } from '@angular/core';
import { TechnologyService } from 'src/app/service/technology.service';
import { PersonService } from 'src/app/service/person.service';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-template-v01',
  templateUrl: './template-v01.component.html',
  styleUrls: ['./template-v01.component.css'],
})
export class TemplateV01Component implements OnInit {
  isLogged = false;
  showAboutText: boolean = false;
  showAboutImage: boolean = true;
  person_id: number = 1;
  person: any = '';
  projectList: any = [];
  technologyList: any[] = [];
  filterCategory: any[] = [];
  /* Typewriter effect */
  i: number = 0;
  about: string = ''; /* Description about from DB */
  aboutTypeWriter: string = '';

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private projectService: ProjectService,
    private technologyService: TechnologyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.getPersonProfile();
    this.getProjects();
    this.getTechnologies();
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

  toggleAbout() {
    this.showAboutText = !this.showAboutText;
    this.showAboutImage = !this.showAboutImage;
    this.aboutTypeWriter = '';
    this.i = 0;
    this.typeWriterAbout();
  }

  typeWriterAbout() {
    if (this.i < this.about.length) {
      this.aboutTypeWriter += this.about.charAt(this.i);
      this.i++;
      setTimeout(() => {
        this.typeWriterAbout();
      }, 100);
    }
  }

  filter(category: string) {
    this.filterCategory = this.technologyList.filter((a: any) => {
      if (category == 'all') {
        return a;
      }
      if (a.category == category) {
        return a;
      }
    });
  }

  getPersonProfile() {
    if (this.person_id != 0) {
      this.personService.getPersonProfile(this.person_id).subscribe(
        (data) => {
          this.person = data;
          this.about = data.about;
        },
        (err) => {
          console.log(err);
          this.toastr.error(
            'No se ha podido obtener los datos del perfil.',
            'Error',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
        }
      );
    }
  }

  getProjects() {
    if (this.person_id != 0) {
      this.projectService.getProjects(this.person_id).subscribe(
        (data) => {
          this.projectList = data;
        },
        (err) => {
          this.toastr.error(
            'No se ha podido obtener los datos de los proyectos.',
            'Error',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
        }
      );
    }
  }

  getTechnologies() {
    if (this.person_id != 0) {
      this.technologyService.findByPersonId(this.person_id).subscribe(
        (data) => {
          this.technologyList = data;
          this.filterCategory = data;
        },
        (err) => {
          this.toastr.error(
            'No se ha podido obtener los datos de las tecnologías.',
            'Error',
            {
              timeOut: 3000,
              positionClass: 'toast-top-center',
            }
          );
        }
      );
    }
  }
}
