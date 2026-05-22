import { FaGithub, FaLinkedin, FaWhatsapp  } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import FadeInSection from './FadeInSection'

const Footer = ({data}) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container-custom">
        <FadeInSection>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={data.nav.photo} alt="" className="w-60"/>

          <p className="text-sm text-gray-500">
            © {currentYear} Rodrigo Martin Durán. Todos los derechos reservados.
          </p>

          
          <div className="flex gap-4">
            <a href="https://github.com/RodrigoDuran14" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigoduran14"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={`mailto:${data.contact.email}`}
              target="_blank"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              <FiMail size={20} />
            </a>
            <a
              href={`https://wa.me/549${data.contact.phone}?text=Hola%20vi%20tu%20portfolio%20y%20quiero%20contactarme%20con%20vos`}
              target="_blank"
              className="text-gray-400 hover:text-accent transition-colors"
            >
              <FaWhatsapp  size={20} />
            </a>
          </div>
        </div>
        </FadeInSection>
      </div>
    </footer>
  )
}

export default Footer