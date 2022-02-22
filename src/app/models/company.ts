export class Company {
  id?: number;
  name: string;
  logo?: any;

  constructor(name: string, logo: any) {
    this.name = name;
    this.logo = logo;
  }
}
