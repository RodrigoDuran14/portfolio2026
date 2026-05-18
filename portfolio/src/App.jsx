import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import portfolioData from './data/portfolioData.json'

function App() {
  const [data, setData] = useState(null)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    // Cargar los datos del JSON
    setData(portfolioData.es)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'projects', 'skills', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar data={data} activeSection={activeSection} />
      <main>
        <About data={data} />
        <Education data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Skills data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  )
}

export default App