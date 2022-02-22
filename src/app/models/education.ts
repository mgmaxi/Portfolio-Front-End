export class Education {
  id?: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  school?: any;

  constructor(
    name: string,
    description: string,
    start_date: Date,
    end_date: Date
  ) {
    this.name = name;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
