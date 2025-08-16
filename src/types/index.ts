// TypeScript interfaces and types

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  techStack?: string[];
}

export interface Skill {
  name: string;
  category: "Web Development" | "Programming" | "Data & Backend" | "Development Tools";
  level?: "Beginner" | "Intermediate" | "Advanced";
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}
