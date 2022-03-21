export class Socialnetwork {
  id?: number;
  linkedin: string;
  github: string;
  youtube: string;

  constructor(linkedin: string, github: string, youtube: string) {
    this.linkedin = linkedin;
    this.github = github;
    this.youtube = youtube;
  }
}
