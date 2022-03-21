import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Technology } from 'src/app/models/technology';
import { TechnologyService } from 'src/app/service/technology.service';
import { TokenService } from 'src/app/security/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-technology',
  templateUrl: './profile-technology.component.html',
  styleUrls: ['./profile-technology.component.css'],
})
export class ProfileTechnologiesComponent implements OnInit {
  @Input() person_id: any;
  technologyList: Technology[] = [];
  filterCategory: Technology[] = [];
  isAdmin = false;
  showAddForm: boolean = false;
  showAddTechToPersonForm: boolean = false;

  constructor(
    private tokenService: TokenService,
    private technologyService: TechnologyService,
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
      this.getTechnologies();
    });
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

  getTechnologies() {
    if (this.person_id != 0) {
      this.technologyService
        .findByPersonId(this.person_id)
        .subscribe((data) => {
          this.technologyList = data;
          this.filterCategory = data;
        });
    }
  }

  addTechnology(technology: Technology) {
    let { name, category, logo, url } = technology;
    const newTechnology = { name, category, logo, url };
    this.technologyService.addTechnology(newTechnology).subscribe(
      (data) => {
        this.toastr.success(
          'La tecnología "' + name + '" ha sido creada!',
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

  addTechToPerson(technology_id: number) {
    this.technologyService
      .addTechnologyToPerson(this.person_id, technology_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'La tecnología ha sido agregada a "' + data.name + '"!',
            'Tecnología agregada',
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
    this.toggleAddTechToPersonForm();
  }

  deleteTechnologyOfPerson(technology: Technology) {
    let technology_id = technology.id;
    this.technologyService
      .deleteTechnologyOfPerson(this.person_id, technology_id!)
      .subscribe(
        (data) => {
          this.toastr.success(
            'La tecnología "' +
              technology.name +
              '" ha sido eliminado de la cuenta!',
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

  deleteAllTechnologiesFromPerson() {
    this.technologyService
      .deleteAllTechnologiesFromPerson(this.person_id)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Todas las tecnologías han sido eliminados de la cuenta!',
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

  toggleAddTechToPersonForm() {
    this.showAddTechToPersonForm = !this.showAddTechToPersonForm;
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['profile']);
      });
  }
}
