import { FiMenu, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import FadeInSection from './FadeInSection'

const Navbar = ({ data, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: 'about', label: data.section.about },
    { id: 'education', label: data.section.education },
    { id: 'experience', label: data.section.experience },
    { id: 'projects', label: data.section.projects },
    { id: 'skills', label: data.section.skills },
    { id: 'contact', label: data.section.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'Rodrigo_Duran_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container-custom">
        <FadeInSection direction='bottom'>
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('about')}
            className="text-xl font-semibold tracking-tight hover:text-gray-600 transition-colors"
          >
            <img src={data.nav.image} className='min-w-22.5 w-30' />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-colors hover:text-accent ${
                  activeSection === item.id
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleDownloadCV}
              className="ml-4 px-5 py-2 text-white text-sm font-medium rounded-full transition-colors bg-accent hover:bg-accent-dark min-w-18"
            >
              {data.nav.button}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-2 py-2 text-sm transition-colors ${
                    activeSection === item.id
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleDownloadCV}
                className="mt-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-full hover:bg-accent-dark transition-colors"
              >
                {data.nav.button}
              </button>
            </div>
          </div>
        )}
        </FadeInSection>
      </div>
    </nav>
  )
}

export default Navbar