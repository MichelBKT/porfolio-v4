import React from 'react';
import { Link } from 'react-router-dom';
import Typography from "./core/Typography.jsx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/michel-banckaert-54-devweb/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 511 512">
          <path d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/MichelBKT',
      icon: (
        <svg width="24" height="24" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 1.75001C9.35093 1.75001 8.21312 1.97633 7.15152 2.41606C6.08992 2.85579 5.12533 3.50031 4.31282 4.31282C2.67187 5.95377 1.75 8.17936 1.75 10.5C1.75 14.3675 4.26125 17.6488 7.735 18.8125C8.1725 18.8825 8.3125 18.6113 8.3125 18.375V16.8963C5.88875 17.4213 5.3725 15.7238 5.3725 15.7238C4.97 14.7088 4.40125 14.4375 4.40125 14.4375C3.605 13.895 4.4625 13.9125 4.4625 13.9125C5.3375 13.9738 5.80125 14.8138 5.80125 14.8138C6.5625 16.1438 7.84875 15.75 8.3475 15.54C8.42625 14.9713 8.65375 14.5863 8.89875 14.3675C6.95625 14.1488 4.9175 13.3963 4.9175 10.0625C4.9175 9.09126 5.25 8.31251 5.81875 7.69126C5.73125 7.47251 5.425 6.56251 5.90625 5.38126C5.90625 5.38126 6.64125 5.14501 8.3125 6.27376C9.00375 6.08126 9.75625 5.98501 10.5 5.98501C11.2438 5.98501 11.9962 6.08126 12.6875 6.27376C14.3587 5.14501 15.0938 5.38126 15.0938 5.38126C15.575 6.56251 15.2688 7.47251 15.1813 7.69126C15.75 8.31251 16.0825 9.09126 16.0825 10.0625C16.0825 13.405 14.035 14.14 12.0838 14.3588C12.3988 14.63 12.6875 15.1638 12.6875 15.9775V18.375C12.6875 18.6113 12.8275 18.8913 13.2738 18.8125C16.7475 17.64 19.25 14.3675 19.25 10.5C19.25 9.35094 19.0237 8.21312 18.5839 7.15153C18.1442 6.08993 17.4997 5.12533 16.6872 4.31282C15.8747 3.50031 14.9101 2.85579 13.8485 2.41606C12.7869 1.97633 11.6491 1.75001 10.5 1.75001V1.75001Z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:michel.banckaert@epitech.eu',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 479.058 479.058">
          <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"/>
        </svg>
      )
    }
  ];

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-synth-dark/90 backdrop-blur-sm text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Typography variant={"h5"} className="text-2xl font-bold text-transparent bg-gradient-to-r from-fuchsia-900 via-violet-900 to-cyan-300 bg-clip-text">
                MB
              </Typography>
            </Link>
            <p className="text-sm">
              Développeur web passionné.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2" id='navFooter'>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={'#' + link.id} className="text-sm hover:text-galaxy-light transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-galaxy-light transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>
            © {currentYear} Michel Banckaert. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 