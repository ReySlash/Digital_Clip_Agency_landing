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
      "Tú grabas, nosotros hacemos que funcione con edición profesional y optimización de contenido para YouTube, Instagram y TikTok.",
    primaryCta: {
      label: "Ver proyectos",
      href: "#portafolio",
    },
    secondaryCta: {
      label: "Contactar",
      href: "#contacto",
    },
    stats: [
      "Entrega rápida y consistente",
      "Edición enfocada en crecimiento",
      "Calendario de contenido activo",
    ],
  },
  services: {
    title: "Qué ofrecemos",
    description:
      "Tu tiempo vale más creando que editando. Déjalo en manos profesionales para publicar con claridad, ritmo y consistencia.",
    items: [
      {
        title: "Producción de video",
        icon: "/video-production.svg",
        description:
          "Edición profesional para piezas que se ven sólidas, claras y listas para publicar.",
      },
      {
        title: "Creación de contenido",
        icon: "/content-creation.svg",
        description:
          "Soporte visual para mantener un flujo constante de contenido en tus plataformas.",
      },
      {
        title: "Narración visual",
        icon: "/visual-narration.svg",
        description:
          "Estructura, ritmo y enfoque para que cada video comunique mejor tu mensaje.",
      },
      {
        title: "Optimización para redes",
        icon: "/social-optimization.svg",
        description:
          "Contenido adaptado para crecer en YouTube, Instagram y TikTok sin perder identidad.",
      },
    ],
  },
  portfolio: {
    title: "Proyectos pensados para crecer en cada plataforma",
    description:
      "Una selección inicial de formatos y piezas que representan el tipo de contenido que la agencia puede producir.",
    items: [
      {
        title: "Canal de crecimiento personal",
        platform: "YouTube",
        description:
          "Edición de formato largo con narrativa clara, cortes precisos y retención visual.",
      },
      {
        title: "Contenido vertical para marca personal",
        platform: "Instagram",
        description:
          "Piezas breves pensadas para mantener consistencia visual y acelerar la publicación.",
      },
      {
        title: "Serie de clips para alcance orgánico",
        platform: "TikTok",
        description:
          "Short-form con ritmo rápido, subtítulos y enfoque en retención durante los primeros segundos.",
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
