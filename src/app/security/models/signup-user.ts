export class SignupUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;

  constructor(
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
