import React from 'react';
import dynamic from 'next/dynamic';
import { 
  JavascriptOriginal,
  ReactOriginal,
  TypescriptOriginal,
  NextjsOriginal,
  Html5Original,
  Css3Original,
  SassOriginal,
  TailwindcssOriginal,
  FigmaOriginal,
  PythonOriginal,
  JavaOriginal,
  COriginal,
  CplusplusOriginal,
  ScalaOriginal,
  ROriginal,
  AzuresqldatabasePlain,
  DjangoPlain,
  NodejsOriginal,
  FirebaseOriginal,
  GitOriginal,
  GithubOriginal,
  VercelOriginal,
  DockerOriginal,
  PostmanOriginal,
  ChakrauiOriginal,
} from 'devicons-react';
import { TechIcon } from './CustomIcons';

// Tech icon mapping
type IconComponent = React.ComponentType<{ size?: string | number }>;

const skillIconMap: Record<string, IconComponent> = {
  // Web Development
  'JavaScript': JavascriptOriginal,
  'TypeScript': TypescriptOriginal,
  'React': ReactOriginal,
  'Next.js': NextjsOriginal,
  'HTML': Html5Original,
  'CSS': Css3Original,
  'SCSS': SassOriginal,
  'Tailwind CSS': TailwindcssOriginal,
  'Figma': FigmaOriginal,
  'Chakra UI': ChakrauiOriginal,
  
  // Programming
  'Python': PythonOriginal,
  'Java': JavaOriginal,
  'C': COriginal,
  'C++': CplusplusOriginal,
  'Scala': ScalaOriginal,
  'R': ROriginal,
  
  // Data & Backend
  'SQL':   AzuresqldatabasePlain,
  'Django': DjangoPlain,
  'NodeJS': NodejsOriginal,
  'Firebase': FirebaseOriginal,
  
  // Development Tools
  'Git': GitOriginal,
  'GitHub': GithubOriginal,
  'Vercel': VercelOriginal,
  'Docker': DockerOriginal,
  'Postman': PostmanOriginal,
};

// Tech Icon Renderer Component
interface TechIconRendererProps {
  skillName: string;
  size?: string | number;
  className?: string;
}

const TechIconRendererComponent = ({ 
  skillName, 
  size = "24", 
  className = "w-6 h-6 text-blue-400" 
}: TechIconRendererProps) => {
  const IconComponent = skillIconMap[skillName];
  
  if (IconComponent) {
    return <IconComponent size={size} />;
  }
  
  // Fallback to generic tech icon if no specific icon is found
  return <TechIcon className={className} />;
};

// Export as dynamic component to prevent hydration issues
export const TechIconRenderer = dynamic(() => Promise.resolve(TechIconRendererComponent), {
  ssr: false,
  loading: () => <TechIcon className="w-6 h-6 text-blue-400" />
});

export { skillIconMap };
