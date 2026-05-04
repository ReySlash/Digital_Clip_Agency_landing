export const siteData = {
  agency: {
    name: "Digital Clip Agency",
    email: "digitalclipagency@gmail.com",
    instagram:
      "https://www.instagram.com/digitalclip.agency?igsh=enZxdHZkdjRlYnh2",
    platforms: ["YouTube", "Instagram", "TikTok"],
  },
  hero: {
    eyebrow: "Edición estratégica para creadores",
    title: "Edita menos, crea más.",
    description:
      "Editamos tus videos para aumentar retención y views en YouTube, Instagram y TikTok.",
    primaryCta: {
      label: "Ver ejemplos reales",
      href: "#portafolio",
    },
    secondaryCta: {
      label: "Envíanos un mensaje",
      href: "#contacto",
    },
  },
  services: {
    title: "Lo que hacemos por tu contenido",
    description:
      "Tu tiempo vale más creando que editando. Déjalo en manos profesionales para publicar con claridad, ritmo y consistencia.",
    items: [
      {
        title: "Edición para contenido corto",
        icon: "/video-production.svg",
        description:
          "Videos optimizados para captar atención y aumentar retención en TikTok, Reels y Shorts.",
      },
      {
        title: "Optimización para crecer",
        icon: "/social-optimization.svg",
        description:
          "Ajustamos ritmo, subtítulos y estructura para mejorar views y engagement.",
      },
      {
        title: "Flujo de contenido constante",
        icon: "/visual-narration.svg",
        description:
          "Te ayudamos a publicar de forma consistente sin perder calidad ni tiempo.",
      },
    ],
  },
  portfolio: {
    title: "Ejemplos reales de edición para creadores",
    description:
      "Una muestra de videos producidos por la agencia para que puedas ver el tipo de edición, ritmo y presentación que desarrollan.",
    items: [
      {
        title: "¿Cómo logré salir de Cuba? (sin pagar nada)",
        platform: "YouTube",
        thumbnail: "https://i.ytimg.com/vi/D8u3r_vhjJk/hqdefault.jpg",
        href: "https://www.youtube.com/watch?v=D8u3r_vhjJk",
        description:
          "Historia personal contada con edición enfocada en claridad narrativa, ritmo visual y retención en formato largo.",
      },
      {
        title: "Mi trabajo en Qatar: salario, realidad y lo difícil.",
        platform: "YouTube",
        thumbnail: "https://i.ytimg.com/vi/3GLKHEpMtpE/hqdefault.jpg",
        href: "https://www.youtube.com/watch?v=3GLKHEpMtpE",
        description:
          "Video testimonial con estructura directa, cortes limpios y edición pensada para sostener interés durante toda la historia.",
      },
      {
        title: "Mi historia: por qué decidí irme de Cuba",
        platform: "YouTube",
        thumbnail: "https://i.ytimg.com/vi/GW6iqJYiv0Y/hqdefault.jpg",
        href: "https://www.youtube.com/watch?v=GW6iqJYiv0Y&t=117s",
        description:
          "Relato personal editado para reforzar emoción, continuidad visual y conexión con la audiencia desde el inicio.",
      },
    ],
  },
  about: {
    title: "Editamos para que puedas enfocarte en crear",
    description:
      "Digital Clip Agency ayuda a creadores a ahorrar horas de trabajo para que puedan concentrarse en grabar, publicar y crecer su canal con una entrega rápida y confiable.",
    points: [
      "Tú grabas, nosotros hacemos que funcione.",
      "No solo editamos, también optimizamos tu contenido para crecer.",
      "Enfócate en crear mientras nosotros sostenemos tu ritmo de publicación.",
    ],
  },
  contact: {
    title: "Hablemos de tu contenido",
    description:
      "Si quieres delegar la edición y mantener tu contenido activo, escríbenos por correo y te responderemos con el siguiente paso.",
    ctaLabel: "Enviar email",
  },
} as const;
