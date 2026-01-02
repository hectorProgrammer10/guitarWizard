"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 2026",
    backHome: "← Back to Home",
    sections: [
      {
        title: "Introduction",
        content: "Welcome to Guitar Scale Wizard. We respect your privacy and are committed to protecting any information you may share while using our application. This Privacy Policy explains how we collect, use, and safeguard your information."
      },
      {
        title: "Information We Collect",
        content: "Guitar Scale Wizard is designed with privacy in mind. We collect minimal information:",
        list: [
          "Language Preference: We store your language preference (English or Spanish) locally in your browser using localStorage. This data never leaves your device.",
          "No Personal Data: We do not collect, store, or transmit any personal information such as names, email addresses, or contact details.",
          "No Account Required: You can use all features of our application without creating an account."
        ]
      },
      {
        title: "How We Use Information",
        content: "The only information we store (language preference) is used solely to:",
        list: [
          "Remember your preferred language between sessions",
          "Provide you with a consistent user experience"
        ]
      },
      {
        title: "Cookies and Tracking",
        content: "Guitar Scale Wizard does not use cookies for tracking purposes. We do not use any analytics services, advertising networks, or third-party tracking tools. Your browsing activity on our application remains private."
      },
      {
        title: "Data Storage",
        content: "All data is stored locally on your device using your browser's localStorage feature. This means:",
        list: [
          "Your data never leaves your device",
          "We cannot access your stored preferences",
          "You can clear this data at any time through your browser settings"
        ]
      },
      {
        title: "Third-Party Services",
        content: "Our application does not integrate with any third-party services that would collect or process your personal data. We do not share any information with third parties."
      },
      {
        title: "Children's Privacy",
        content: "Guitar Scale Wizard is safe for users of all ages. Since we do not collect any personal information, there are no special provisions needed for children's privacy."
      },
      {
        title: "Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."
      },
      {
        title: "Contact Us",
        content: "If you have any questions about this Privacy Policy or our privacy practices, please feel free to contact us through our official channels."
      }
    ]
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: Enero 2026",
    backHome: "← Volver al Inicio",
    sections: [
      {
        title: "Introducción",
        content: "Bienvenido a Mago de Escalas. Respetamos tu privacidad y estamos comprometidos a proteger cualquier información que puedas compartir mientras usas nuestra aplicación. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información."
      },
      {
        title: "Información que Recopilamos",
        content: "Mago de Escalas está diseñado pensando en la privacidad. Recopilamos información mínima:",
        list: [
          "Preferencia de Idioma: Almacenamos tu preferencia de idioma (Inglés o Español) localmente en tu navegador usando localStorage. Estos datos nunca salen de tu dispositivo.",
          "Sin Datos Personales: No recopilamos, almacenamos ni transmitimos ninguna información personal como nombres, direcciones de correo electrónico o datos de contacto.",
          "Sin Cuenta Requerida: Puedes usar todas las funciones de nuestra aplicación sin crear una cuenta."
        ]
      },
      {
        title: "Cómo Usamos la Información",
        content: "La única información que almacenamos (preferencia de idioma) se usa únicamente para:",
        list: [
          "Recordar tu idioma preferido entre sesiones",
          "Proporcionarte una experiencia de usuario consistente"
        ]
      },
      {
        title: "Cookies y Rastreo",
        content: "Mago de Escalas no usa cookies con fines de rastreo. No utilizamos servicios de análisis, redes publicitarias ni herramientas de rastreo de terceros. Tu actividad de navegación en nuestra aplicación permanece privada."
      },
      {
        title: "Almacenamiento de Datos",
        content: "Todos los datos se almacenan localmente en tu dispositivo usando la función localStorage de tu navegador. Esto significa:",
        list: [
          "Tus datos nunca salen de tu dispositivo",
          "No podemos acceder a tus preferencias almacenadas",
          "Puedes borrar estos datos en cualquier momento a través de la configuración de tu navegador"
        ]
      },
      {
        title: "Servicios de Terceros",
        content: "Nuestra aplicación no se integra con ningún servicio de terceros que recopile o procese tus datos personales. No compartimos ninguna información con terceros."
      },
      {
        title: "Privacidad de los Niños",
        content: "Mago de Escalas es seguro para usuarios de todas las edades. Dado que no recopilamos ninguna información personal, no se necesitan disposiciones especiales para la privacidad de los niños."
      },
      {
        title: "Cambios a Esta Política",
        content: "Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio se publicará en esta página con una fecha de revisión actualizada. Te animamos a revisar esta política periódicamente."
      },
      {
        title: "Contáctanos",
        content: "Si tienes alguna pregunta sobre esta Política de Privacidad o nuestras prácticas de privacidad, no dudes en contactarnos a través de nuestros canales oficiales."
      }
    ]
  }
};

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const content = privacyContent[language];

  return (
    <main className="min-h-screen p-4 md:p-8 relative">
      <LanguageSelector />

      <div className="max-w-4xl mx-auto flex flex-col items-center mt-3 gap-6">
        
        {/* Header */}
        <div className="text-center mt-8 glass py-6 px-8 rounded-xl w-full">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {content.title}
            </span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            {content.lastUpdated}
          </p>
        </div>

        {/* Back Link */}
        <Link 
          href="/"
          className="self-start glass-btn px-4 py-2 rounded-lg text-sm font-medium hover:text-primary transition-colors"
        >
          {content.backHome}
        </Link>

        {/* Content Sections */}
        <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {content.sections.map((section, index) => (
            <section 
              key={index}
              className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                {section.content}
              </p>
              {section.list && (
                <ul className="space-y-2 ml-4">
                  {section.list.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="text-slate-600 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="glass py-4 px-6 rounded-xl text-center w-full mt-4 mb-8">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Guitar Scale Wizard / Mago de Escalas
          </p>
        </footer>

      </div>
    </main>
  );
}
