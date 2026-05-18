import { FiBriefcase } from 'react-icons/fi'

const Experience = ({ data }) => {
  const experienceData = data.experience

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title">{experienceData.title}</h2>
        <div className="max-w-3xl mx-auto">
          {experienceData.info.map((item, index) => (
            <div
              key={index}
              className="relative pl-8 pb-12 last:pb-0 border-l-2 border-gray-200 ml-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 -translate-x-1/2 mt-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--color-accent)' }}>
                  <FiBriefcase size={16} className="text-white" />
                </div>
              </div>
              
              <div className="apple-card p-6 ml-4">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {item.years}
                  </span>
                </div>
                <p className="text-gray-500 mb-3">{item.place}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience