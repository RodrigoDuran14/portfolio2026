import { FiExternalLink } from 'react-icons/fi'

const Education = ({ data }) => {
  const educationData = data.education

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">{educationData.title}</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {educationData.info.map((item, index) => (
            <div
              key={index}
              className="apple-card p-6 md:p-8 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {item.certified && (
                  <a href={item.certified} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-full transition-colors whitespace-nowrap bg-accent hover:bg-accent-dark">
                    {educationData.button}
                    <FiExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education