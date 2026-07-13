export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "user";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  subcategories: { name: string; description: string }[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscriber {
  _id: string;
  email: string;
  subscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
