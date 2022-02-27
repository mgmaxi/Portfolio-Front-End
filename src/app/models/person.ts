export class Person {
  id?: number;
  name: string;
  nationality: string;
  profession: string;
  about: string;

  constructor(
    name: string,
    nationality: string,
    profession: string,
    about: string
  ) {
    this.name = name;
    this.nationality = nationality;
    this.profession = profession;
    this.about = about;
  }
}
