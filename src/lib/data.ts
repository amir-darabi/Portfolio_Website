import { PersonalInfo, Project, Experience, Skill, NavigationLink } from '@/types';

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
      "Participated in agile ceremonies and Git-based workflows"
    ]
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
      "Organized events to promote the app and engage stakeholders"
    ]
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
      "Provided mentorship for algorithmic problem-solving techniques"
    ]
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
