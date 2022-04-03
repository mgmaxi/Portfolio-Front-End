import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Technology } from 'src/app/models/technology';
import { TechnologyService } from 'src/app/service/technology.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-technology-to-person',
  templateUrl: './add-technology-to-person.component.html',
  styleUrls: ['./add-technology-to-person.component.css'],
})
export class FormAddTechToPersonComponent implements OnInit {
  @Output() onAddTechToPerson: EventEmitter<number> = new EventEmitter();
  technologyList: any[] = [];

  constructor(
    private technologyService: TechnologyService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTechnologies();
  }

  refreshComponent() {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  /* Services */

  getTechnologies() {
    this.technologyService
      .getTechnologies()
      .subscribe((data) => (this.technologyList = data));
  }

  addTechnologyToPerson(technology: Technology) {
    let { id: technology_id } = technology;
    this.onAddTechToPerson.emit(technology_id);
  }

  deleteTechnology(technology: Technology) {
    let technology_id = technology.id;
    this.technologyService.deleteTechnology(technology_id!).subscribe(
      (data) => {
        this.toastr.success(
          technology.name + ' has been permanently deleted!',
          'Successful delete!',
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
}
