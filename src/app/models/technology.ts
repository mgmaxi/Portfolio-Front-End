export class Technology {
  id?: number;
  name: string;
  category: string;
  logo?: string;
  url?: string;

  constructor(name: string, category: string, logo?: string, url?: string) {
    this.name = name;
    this.category = category;
    this.logo = logo;
    this.url = url;
  }
}
