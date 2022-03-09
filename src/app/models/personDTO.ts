export class PersonDTO {
  id?: number;
  name: string;
  nationality: string;
  profession: string;
  about: string;
  userphotos_id?: number;
  profile_photo: string;
  cover_photo: string;

  constructor(
    name: string,
    nationality: string,
    profession: string,
    about: string,
    profile_photo: string,
    cover_photo: string
  ) {
    this.name = name;
    this.nationality = nationality;
    this.profession = profession;
    this.about = about;
    this.profile_photo = profile_photo;
    this.cover_photo = cover_photo;
  }
}
