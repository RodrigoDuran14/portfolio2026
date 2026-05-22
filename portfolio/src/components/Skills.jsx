import { 
  DiHtml5, DiCss3, DiJavascript1, DiReact, DiNodejsSmall, 
  DiMongodb, DiGit, DiPostgresql, DiPython, DiDjango, DiMsqlServer  
} from 'react-icons/di';
import { SiExpress, SiRedux, SiSequelize, SiTailwindcss, SiFirebase, SiCloudinary, SiVite   } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import FadeInSection from './FadeInSection';


const Skills = ({ data }) => {
  const skillsData = data.skills;

  const getIconComponent = (skillName) => {
    const icons = {
      'HTML': DiHtml5,
      'CSS': DiCss3,
      'JavaScript': DiJavascript1,
      'React': DiReact,
      'NodeJS': DiNodejsSmall,
      'MongoDB': DiMongodb,
      'Git': DiGit,
      'Express': SiExpress,
      'PostgreSQL': DiPostgresql,
      'Django': DiDjango,
      'C#': TbBrandCSharp,
      'Python': DiPython,
      'Redux': SiRedux,
      'Sequelize': SiSequelize,
      'SQLServer': DiMsqlServer,
      'TailwindCSS': SiTailwindcss,
      'Firebase': SiFirebase,
      'Cloudinary': SiCloudinary,
      'Vite': SiVite 
    };
    return icons[skillName] || null;
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container-custom">
        <FadeInSection>
        <h2 className="section-title">{skillsData.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skillsData.info.map((skill, index) => {
            const IconComponent = getIconComponent(skill.name);
            return (
              <div
                key={index}
                className="flex flex-col items-center p-4 apple-card hover:shadow-md transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <FadeInSection direction='left'>
                <div className="w-16 h-16 mb-3 flex items-center justify-center text-gray-700 group-hover:text-accent transition-colors">
                  {IconComponent ? (
                    <IconComponent size={48} />
                  ) : (
                    <span className="text-lg font-bold">{skill.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                </FadeInSection>
              </div>
            );
          })}
        </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Skills;