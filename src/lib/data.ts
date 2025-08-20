import {
  PersonalInfo,
  Project,
  Experience,
  Skill,
  NavigationLink,
} from "@/types";

// Personal Information
export const personalInfo: PersonalInfo = {
  name: "Amir Darabi",
  title: "Software Developer...",
  bio: "Transforming ideas into seamless digital experiences...",
  email: "amiirdrbii@gmail.com",
  phone: "+31 684262591",
  location: "Amsterdam, The Netherlands",
  socialLinks: {
    github: "https://github.com/amir-darabi",
    linkedin: "https://www.linkedin.com/in/amir-darabi-286632213",
  },
};

// Navigation Links
export const navigationLinks: NavigationLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

// Skills
export const skills: Skill[] = [
  // Web Development
  { name: "JavaScript", category: "Web Development", level: "Advanced" },
  { name: "TypeScript", category: "Web Development", level: "Advanced" },
  { name: "React", category: "Web Development", level: "Advanced" },
  { name: "Next.js", category: "Web Development", level: "Advanced" },
  { name: "HTML", category: "Web Development", level: "Advanced" },
  { name: "CSS", category: "Web Development", level: "Advanced" },
  { name: "SCSS", category: "Web Development", level: "Intermediate" },
  { name: "Tailwind CSS", category: "Web Development", level: "Advanced" },
  { name: "Figma", category: "Web Development", level: "Advanced" },

  // Programming
  { name: "Python", category: "Programming", level: "Advanced" },
  { name: "Java", category: "Programming", level: "Intermediate" },
  { name: "C", category: "Programming", level: "Intermediate" },
  { name: "C++", category: "Programming", level: "Intermediate" },
  { name: "Scala", category: "Programming", level: "Intermediate" },
  { name: "R", category: "Programming", level: "Intermediate" },

  // Data & Backend
  { name: "SQL", category: "Data & Backend", level: "Advanced" },
  { name: "Django", category: "Data & Backend", level: "Advanced" },
  { name: "NodeJS", category: "Data & Backend", level: "Intermediate" },
  { name: "Firebase", category: "Data & Backend", level: "Intermediate" },

  // Development Tools
  { name: "Git", category: "Development Tools", level: "Advanced" },
  { name: "GitHub", category: "Development Tools", level: "Advanced" },
  { name: "Vercel", category: "Development Tools", level: "Advanced" },
  { name: "Docker", category: "Development Tools", level: "Intermediate" },
  { name: "Postman", category: "Development Tools", level: "Intermediate" },
];

// Experience
export const experience: Experience[] = [
  {
    id: "1",
    company: "Capisoft",
    position: "Full Stack Developer",
    location: "Amsterdam, Netherlands",
    startDate: "Apr 2025",
    endDate: "Present",
    description: [
      "Built scalable frontend features using React, Typescript and ChakraUI, with Django powering the backend",
      "Improved user experience and design consistency through collaboration with developers",
      "Participated in agile ceremonies and Git-based workflows",
    ],
  },
  {
    id: "2",
    company: "Janus Innovation hub",
    position: "Software Development Intern",
    location: "San Diego, California",
    startDate: "Nov 2024",
    endDate: "Feb 2025",
    description: [
      "Conducted user and technical research to shape app features",
      "Collaborated with cross-functional teams to streamline development and boost adoption",
      "Organized events to promote the app and engage stakeholders",
    ],
  },
  {
    id: "3",
    company: "VU Amsterdam",
    position: "Teacher Assistant in Data Structures & Algorithms",
    location: "Amsterdam, Netherlands",
    startDate: "Nov 2023",
    endDate: "Feb 2024",
    description: [
      "Supported students in mastering DSA through direct guidance",
      "Assisted in course material preparation and practical sessions",
      "Provided mentorship for algorithmic problem-solving techniques",
    ],
  },
];

// Projects
export const projects: Project[] = [
  {
    id: "1",
    title: "Full-Stack Todo Application",
    description:
      "A complete todo application with user authentication, CRUD operations, and database integration.",
    longDescription:
      "Developed a comprehensive task management system with user registration, authentication, full CRUD operations, data persistence, task categories, priority levels, and real-time updates. Features both frontend and backend with database integration.",
    techStack: ["React", "Django", "SQLite", "Firebase", "JWT", "TanStack Query"],
    imageUrl: "/images/projects/todo-preview.png",
    demoUrl: "#", // Will add later
    githubUrl: "#", // Will add later
    featured: true,
  },
  {
    id: "2",
    title: "Frontend Dashboard",
    description:
      "A comprehensive admin dashboard with analytics, user management, and data visualization.",
    longDescription:
      "Built a modern admin dashboard featuring real-time analytics, user management system, interactive charts, and responsive design. Includes data filtering, export functionality, and role-based access controls.",
    techStack: ["React", "Node.js", "TypeScript", "JavaScript", "Chakra UI", "Vite"],
    imageUrl: "/images/projects/dashboard-preview.png",
    demoUrl: "#", // Will add later
    githubUrl: "#", // Will add later
    featured: true,
  },
  {
    id: "3",
    title: "Frontend Webshop",
    description:
      "A responsive e-commerce frontend with dynamic product listings and Grid/List view modes.",
    longDescription:
      "Developed a modern webshop frontend showcasing products with both Grid and List view options. Designed with a clean and responsive UI to highlight products, provide detailed views, and deliver a smooth browsing experience across devices.",
    techStack: ["React", "Node.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
    imageUrl: "/images/projects/webshop-preview.png",
    demoUrl: "#", // Will add later
    githubUrl: "#", // Will add later
    featured: true,
  },
];
