import { PersonalInfo, Project, Experience, Skill, NavigationLink } from '@/types';

// Personal Information
export const personalInfo: PersonalInfo = {
  name: "Amir Darabi",
  title: "Software Developer...",
  bio: "Passionate developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems.",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, Country",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  }
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
  // Frontend
  { name: "React", category: "Frontend", level: "Advanced" },
  { name: "Next.js", category: "Frontend", level: "Advanced" },
  { name: "TypeScript", category: "Frontend", level: "Advanced" },
  { name: "JavaScript", category: "Frontend", level: "Advanced" },
  { name: "HTML/CSS", category: "Frontend", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
  
  // Backend
  { name: "Node.js", category: "Backend", level: "Intermediate" },
  { name: "Express.js", category: "Backend", level: "Intermediate" },
  { name: "Python", category: "Backend", level: "Intermediate" },
  
  // Database
  { name: "MongoDB", category: "Database", level: "Intermediate" },
  { name: "PostgreSQL", category: "Database", level: "Intermediate" },
  
  // Tools
  { name: "Git", category: "Tools", level: "Advanced" },
  { name: "Docker", category: "Tools", level: "Intermediate" },
  { name: "VS Code", category: "Tools", level: "Advanced" },
];

// Experience
export const experience: Experience[] = [
  {
    id: "1",
    company: "Tech Company",
    position: "Frontend Developer",
    startDate: "2022",
    endDate: "Present",
    description: [
      "Developed responsive web applications using React and Next.js",
      "Collaborated with design team to implement pixel-perfect UI components",
      "Optimized application performance resulting in 40% faster load times"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "2",
    company: "Startup Inc",
    position: "Full Stack Developer",
    startDate: "2021",
    endDate: "2022",
    description: [
      "Built full-stack applications using MERN stack",
      "Implemented RESTful APIs and database design",
      "Worked in agile environment with cross-functional teams"
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express.js"]
  }
];

// Projects
export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with modern UI and secure payment integration.",
    longDescription: "Built a comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, and secure payment processing using Stripe.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Stripe"],
    imageUrl: "/images/projects/ecommerce.png",
    demoUrl: "https://your-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: true
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    longDescription: "Developed a team collaboration tool with drag-and-drop functionality, real-time notifications, and project management features.",
    techStack: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    imageUrl: "/images/projects/taskapp.png",
    demoUrl: "https://your-demo.com",
    githubUrl: "https://github.com/yourusername/taskapp",
    featured: true
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather application with location-based forecasts.",
    longDescription: "Created a weather dashboard that provides current conditions and forecasts using external APIs with a clean, responsive interface.",
    techStack: ["React", "JavaScript", "CSS3", "Weather API"],
    imageUrl: "/images/projects/weather.png",
    demoUrl: "https://your-demo.com",
    githubUrl: "https://github.com/yourusername/weather",
    featured: false
  }
];
