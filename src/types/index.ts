export interface NavItemType {
  id: string;
  label: string;
}

export interface FeatureType {
  id: number;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export interface GalleryItemType {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface StatType {
  id: number;
  value: string;
  label: string;
  description?: string;
}