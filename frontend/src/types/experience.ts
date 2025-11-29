export interface Technology {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface EmploymentType {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface WorkType {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  title: string;
  company: Company;
  employmentType: EmploymentType;
  startDate: string;
  isCurrentRole: boolean;
  endDate: string | null;
  location: Location;
  workType: WorkType;
  description: string;
  technologies: Technology[];
  updatedAt: string;
  createdAt: string;
}
