export interface Portfolio {
  header: [
    {
      name: string;
      position: string;
      profileCover: string;
      profileImage: string;
    }
  ];
  about: string;
  experience: [
    {
      id?: number;
      section: string;
      title: string;
      company: string;
      description: string;
      year: number;
      logo: string;
    }
  ];
  education: [
    {
      id?: number;
      section: string;
      title: string;
      description: string;
      year: number;
      logo: string;
    }
  ];
  projects: [
    {
      id?: number;
      section: string;
      title: string;
      technologies: string;
      repository: string;
      deploy: string;
      year: number;
      logo: string;
    }
  ];
  technologies: [
    {
      id?: number;
      title: string;
      type: string;
      logo: string;
      url: string;
    }
  ];
  languages: [
    {
      id?: number;
      title: string;
      level: string;
    }
  ];
}
