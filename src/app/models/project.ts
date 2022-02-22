export class Project {
  id?: number;
  name: string;
  description: string;
  end_date: Date;
  repository?: string;
  deploy?: string;
  logo?: string;

  constructor(
    name: string,
    description: string,
    end_date: Date,
    repository?: string,
    deploy?: string,
    logo?: string
  ) {
    this.name = name;
    this.description = description;
    this.end_date = end_date;
    this.repository = repository;
    this.deploy = deploy;
    this.logo = logo;
  }
}
