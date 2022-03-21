export class Person {
  id?: number;
  first_name: string;
  last_name: string;
  nationality: string;
  profession: string;
  about: string;

  constructor(
    first_name: string,
    last_name: string,
    nationality: string,
    profession: string,
    about: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.nationality = nationality;
    this.profession = profession;
    this.about = about;
  }
}
