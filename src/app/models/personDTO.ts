export class PersonDTO {
  id?: number;
  first_name: string;
  last_name: string;
  nationality: string;
  profession: string;
  about: string;
  userphotos_id?: number;
  profile_photo: string;
  cover_photo: string;

  constructor(
    first_name: string,
    last_name: string,
    nationality: string,
    profession: string,
    about: string,
    profile_photo: string,
    cover_photo: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.nationality = nationality;
    this.profession = profession;
    this.about = about;
    this.profile_photo = profile_photo;
    this.cover_photo = cover_photo;
  }
}
