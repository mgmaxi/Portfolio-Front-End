export class Email {
  name: string;
  email: string;
  body: string;
  subject: string;

  constructor(name: string, email: string, body: string, subject: string) {
    this.name = name;
    this.email = email;
    this.body = body;
    this.subject = subject;
  }
}
