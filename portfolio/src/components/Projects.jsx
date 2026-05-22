import { Link } from 'react-router-dom';  // ← importar Link
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import FadeInSection from './FadeInSection';

const Projects = ({ data }) => {
  const projectsData = data.projects;

  // Función para generar slug igual que en ProjectDetail
  const getSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container-custom">
        <FadeInSection>
        <h2 className="section-title">{projectsData.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.info.map((project, index) => {
            const slug = getSlug(project.name);
            return (
              <div
                key={index}
                className="apple-card overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FadeInSection>
                {/* Imagen clicable */}
                <Link to={`/project/${slug}`}>
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Proyecto';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 hover:scale-105">
                        {project.name}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  {/* Título clicable */}
                  <Link to={`/project/${slug}`}>
                    <h3 className="text-xl font-semibold mb-3 hover:text-accent transition-colors  hover:scale-105 duration-500">
                      {project.name}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-3">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors bg-accent hover:bg-accent-dark"
                      onClick={(e) => e.stopPropagation()} // evita navegación accidental
                    >
                      <FaGithub size={16} />
                      {projectsData.button}
                    </a>
                    {project.demo && project.demo !== 'demo' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
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

export default Projects;