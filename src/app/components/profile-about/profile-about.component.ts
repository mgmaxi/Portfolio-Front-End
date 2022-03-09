import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from 'src/app/service/person.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.css'],
})
export class ProfileAboutComponent implements OnInit {
  person: any = '';
  showAboutSection: boolean = true;
  @Input() person_id: any;

  constructor(
    private personService: PersonService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPersonId();
  }

  getPersonId() {
    this.userService.person_id.subscribe((data) => {
      this.person_id = data;
      this.getAbout();
    });
  }

  getAbout() {
    if (this.person_id != 0) {
      this.personService.getPersonProfile(this.person_id).subscribe((data) => {
        this.person = data;
        if (
          this.person.about.length === 0 ||
          this.person.about === null ||
          !this.person.about.trim()
        ) {
          this.showAboutSection = false;
        }
      });
    }
  }
}
