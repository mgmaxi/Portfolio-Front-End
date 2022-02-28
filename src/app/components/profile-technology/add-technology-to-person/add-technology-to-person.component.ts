import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Technology } from 'src/app/models/technology';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-add-technology-to-person',
  templateUrl: './add-technology-to-person.component.html',
  styleUrls: ['./add-technology-to-person.component.css'],
})
export class FormAddTechToPersonComponent implements OnInit {
  @Output() onAddTechToPerson: EventEmitter<number> = new EventEmitter();
  technologyList: any[] = [];

  constructor(private technologyService: TechnologyService) {}

  ngOnInit(): void {
    this.getTechnologies();
  }

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
    this.technologyService
      .deleteTechnology(technology_id!)
      .subscribe(
        () =>
          (this.technologyList = this.technologyList.filter(
            (list) => list.id !== technology_id
          ))
      );
  }
}
