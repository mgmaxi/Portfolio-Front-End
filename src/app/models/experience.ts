export class Experience {
  id?: number;
  name: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  is_current?: boolean;
  company?: any;

  constructor(
    name: string,
    description: string,
    start_date: Date,
    end_date: Date,
    is_current?: boolean
  ) {
    this.name = name;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_current = is_current;
  }
}
