export class Userphotos {
  id?: number;
  profile_photo: string;
  cover_photo: string;

  constructor(profile_photo: string, cover_photo: string) {
    this.profile_photo = profile_photo;
    this.cover_photo = cover_photo;
  }
}
