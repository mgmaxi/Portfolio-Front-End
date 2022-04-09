import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/security/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { PersonService } from 'src/app/service/person.service';
import { SocialnetworkService } from 'src/app/service/socialnetwork.service';
import { Socialnetwork } from 'src/app/models/socialnetwork';
import { ProjectService } from 'src/app/service/project.service';
import { TechnologyService } from 'src/app/service/technology.service';
import { ToastrService } from 'ngx-toastr';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-template-v01',
  templateUrl: './template-v01.component.html',
  styleUrls: ['./template-v01.component.css'],
})
export class TemplateV01Component implements OnInit {
  isLogged = false;
  domainUrl: string = environment.domainUrl;
  username: string = '';
  person_id: number = 0;
  person: any = '';
  cover_photo: string = '../../../assets/image/profile/coverPhoto.png';
  profile_photo: string = '../../../assets/image/profile/profilePhoto.png';
  project_logo: string = '../../../assets/logos/logoProject.png';
  technology_logo: string = '../../../assets/logos/logoTechnology.png';
  showAboutText: boolean = false;
  showAboutImage: boolean = true;
  socials: Socialnetwork = new Socialnetwork('', '', '');
  projectList: any = [];
  technologyList: any[] = [];
  filterCategory: any[] = [];
  /* Typewriter effect */
  i: number = 0;
  about: string = ''; /* Description about from DB */
  aboutTypeWriter: string = '';

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private personService: PersonService,
    private socialnetworkService: SocialnetworkService,
    private projectService: ProjectService,
    private technologyService: TechnologyService,
    private toastr: ToastrService,
    private viewportScroller: ViewportScroller,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.username = params['username'].toString();
      this.getPersonId();
    });
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onLogOut(): void {
    this.tokenService.logOut();
  }

  /* About section */

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

  /* Technologies filter */

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

  /* Services */

  getPersonId() {
    this.userService.getPersonId(this.username).subscribe(
      (data) => {
        this.person_id = data;
        this.getPersonProfile();
        this.getProjects();
        this.getTechnologies();
        this.getSocialnetworks();
      },
      (err) => {
        this.toastr.error('Failed to get person id.', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/notfound']);
      }
    );
  }

  getPersonProfile() {
    if (this.person_id != 0) {
      this.personService.getPersonProfile(this.person_id).subscribe(
        (data) => {
          this.person = data;
          this.about = data.about;
        },
        (err) => {
          this.toastr.error('Failed to get profile data.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
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
          this.toastr.error('Failed to get projects data.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
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
          this.toastr.error('Failed to get technologies data.', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

  getSocialnetworks() {
    if (this.person_id != 0) {
      this.socialnetworkService
        .getSocialNetwork(this.person_id)
        .subscribe((data) => {
          if (data === null) {
            return;
          } else {
            this.socials = data;
          }
        });
    }
  }

  get Name() {
    return this.form.get('name');
  }
  get Email() {
    return this.form.get('email');
  }
  get Message() {
    return this.form.get('message');
  }
}
