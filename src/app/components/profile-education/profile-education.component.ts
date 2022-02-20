import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { EducationList } from './EducationList';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenService } from 'src/app/service/token.service';

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
  roles: string[] = [];
  isAdmin = false;

  constructor(
    private portfolioData: PortfolioService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getEducations();
    this.getRoles();
  }

  getRoles() {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getEducations() {
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
