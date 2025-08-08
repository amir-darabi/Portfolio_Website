import React from 'react';
import { personalInfo, skills, experience } from '@/lib/data';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const About = () => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="about" className="py-20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Learn more about my background, skills, and experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Story */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">My Story</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  {personalInfo.bio}
                </p>
                <p>
                  I am passionate about creating digital solutions that make a difference. 
                  With a strong foundation in modern web technologies, I enjoy tackling 
                  complex problems and turning ideas into reality.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, 
                  contributing to open source projects, or sharing knowledge with the 
                  developer community.
                </p>
              </div>
              
              <div className="mt-8">
                <Button href="/resume.pdf" variant="primary">
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Skills & Technologies</h3>
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h4 className="text-lg font-medium text-gray-300 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.name}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <Card key={exp.id} className="p-6 bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{exp.position}</h4>
                      <p className="text-lg text-blue-400">{exp.company}</p>
                    </div>
                    <span className="text-gray-300 mt-2 md:mt-0">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {exp.description.map((item, index) => (
                      <li key={index} className="text-gray-300">{item}</li>
                    ))}
                  </ul>
                  
                  {exp.techStack && (
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
