import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = ({ data }) => {
  const aboutData = data.about;

  return (
    <section id="about" className="pt-32 pb-20 md:pt-60 md:pb-80 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-gray-100 shadow-sm ">
                <img
                  src={
                    aboutData.photo ||
                    "https://placehold.co/400x400/e2e8f0/1e293b?text=Perfil"
                  }
                  alt="Rodrigo Durán"
                  className="w-full h-full object-cover "
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/400x400/e2e8f0/1e293b?text=Perfil";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Rodrigo Martin Durán
            </h1>
            <p className="text-xl text-gray-600 mb-4">{aboutData.short}</p>
            <p className="text-gray-600 leading-relaxed mb-8">
              {aboutData.long}
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href={aboutData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full transition-colors hover:bg-accent group"
              >
                <FaGithub
                  size={22}
                  className="text-gray-700 group-hover:text-white"
                />
              </a>
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 rounded-full transition-colors hover:bg-accent group"
              >
                <FaLinkedin
                  size={22}
                  className="text-gray-700 group-hover:text-white"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
