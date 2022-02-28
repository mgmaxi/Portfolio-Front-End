export class SignupUser {
  username: string;
  email: string;
  password: string;
  name: string;
  constructor(username: string, email: string, password: string, name: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
