import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaArrowLeft, FaCode, FaStar, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data } = usePortfolio();
  const projects = data.projects.info;

  const project = projects.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
        <Link to="/" className="text-accent hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Recolectar todas las imágenes
  const allImages = [];
  if (project.image) allImages.push(project.image);
  if (project.images && project.images.length) allImages.push(...project.images);

  // Función robusta para normalizar rutas de imágenes
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('/')) return path;
    let normalized = path.replace(/^.*?assets\//, '/assets/');
    normalized = normalized.replace(/\/\//g, '/');
    return normalized;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header fijo con botón de vuelta */}
      <div className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <div className="container-custom py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors"
          >
            <FaArrowLeft size={16} />
            Volver al portfolio
          </Link>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Título del proyecto */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {project.name}
          </h1>

          {/* Carrusel de imágenes */}
          {allImages.length > 0 && (
            <div className="relative mb-10 group">
              <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-100" ref={emblaRef}>
                <div className="flex">
                  {allImages.map((img, idx) => (
                    <div key={idx} className="flex-[0_0_100%] min-w-0">
                      <div className="relative aspect-video bg-gray-100">
                        <img
                          src={getImageUrl(img)}
                          alt={`${project.name} - ${idx + 1}`}
                          className="absolute inset-0 w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              'https://placehold.co/1200x600/e2e8f0/1e293b?text=Imagen+no+disponible';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Anterior"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Siguiente"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Tecnologías utilizadas */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FaCode size={20} className="text-accent" />
                Tecnologías utilizadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Descripción del proyecto */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Descripción del proyecto</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Características destacadas */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FaStar size={20} className="text-accent" />
                Características destacadas
              </h2>
              <ul className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-700">
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Aprendizajes clave */}
          {project.learnings && project.learnings.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FaGraduationCap size={20} className="text-accent" />
                Aprendizajes clave
              </h2>
              <ul className="space-y-2">
                {project.learnings.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-gray-700">
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resultados y conclusión */}
          {project.results && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FaChartLine size={20} className="text-accent" />
                Resultados y conclusión
              </h2>
              <p className="text-gray-700 leading-relaxed">{project.results}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors"
            >
              <FaGithub size={20} />
              Ver repositorio
            </a>
            {project.demo && project.demo !== 'demo' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FiExternalLink size={20} />
                Ver demo en vivo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;