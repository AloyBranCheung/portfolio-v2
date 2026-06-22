export interface TechIcon {
  id: string;
  alt: string;
  url: string;
}

export interface TechCategory {
  id: string;
  name: string;
  order: number | null;
}

export interface TechStackItem {
  id: string;
  name: string;
  order: number | null;
  icon: TechIcon;
  category: TechCategory;
  updatedAt: string;
  createdAt: string;
}
