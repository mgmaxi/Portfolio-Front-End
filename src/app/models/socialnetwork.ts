export class Socialnetwork {
  id?: number;
  linkedin?: string;
  github?: string;
  email?: string;

  constructor(linkedin?: string, github?: string, email?: string) {
    this.linkedin = linkedin;
    this.github = github;
    this.email = email;
  }
}
