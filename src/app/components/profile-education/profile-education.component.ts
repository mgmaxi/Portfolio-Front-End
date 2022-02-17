import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { EducationList } from './EducationList';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css'],
})
export class ProfileEducationComponent implements OnInit {
  educationList: EducationList[] = [];
  showForm: boolean = false;
  person_id: number = 1;
  school_id: number = 1;
  logo: string = '';

  constructor(private portfolioData: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioData
      .getSection('/educations/persons/' + this.person_id)
      .subscribe((data) => (this.educationList = data));
  }
  deleteItem(item: EducationList) {
    this.portfolioData
      .deleteItem('education', item)
      .subscribe(
        () =>
          (this.educationList = this.educationList.filter(
            (list) => list.id !== item.id
          ))
      );
  }

  addEducation(newItem: EducationList) {
    this.portfolioData
      .addItem(
        '/educations/' + this.person_id + '/schools/' + this.school_id,
        newItem
      )
      .subscribe((newItem) => this.educationList.push(newItem));
  }

  toggleForm() {
    this.showForm = !this.showForm;
    console.log(this.showForm);
    console.log('padre');
  }

  onDropped(event: CdkDragDrop<any>) {
    const previous = event.previousIndex;
    const current = event.currentIndex;
    moveItemInArray(this.educationList, previous, current);
  }
}
