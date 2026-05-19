import type { Locale } from "@/lib/i18n";

export const sectionAnchors = {
  home: "home",
  services: "services",
  portfolio: "portfolio",
  about: "about",
  contact: "contact",
} as const;

type SiteDictionary = {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  agency: {
    name: string;
    email: string;
    instagram: string;
    platforms: string[];
  };
  navigation: Array<{ label: string; href: `#${string}` }>;
  languageSwitcher: {
    label: string;
    shortLabel: string;
    toggleLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    socialProof: string;
    primaryCta: {
      label: string;
      href: `#${string}`;
    };
    secondaryCta: {
      label: string;
      href: `#${string}`;
    };
    imageAlts: {
      first: string;
      second: string;
      third: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      icon: string;
      description: string;
    }>;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    errorTitle: string;
    errorDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    ctaLabel: string;
    instagramLabel: string;
    copyEmailLabel: string;
    copiedEmailLabel: string;
  };
  footer: {
    copyright: string;
    instagramLabel: string;
  };
  notFound: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  mobileNav: {
    openMenu: string;
    closeMenu: string;
    title: string;
  };
};

const baseAgencyData = {
  name: "Digital Clip Agency",
  email: "digitalclipagency@gmail.com",
  instagram: "https://www.instagram.com/digitalclip.agency?igsh=enZxdHZkdjRlYnh2",
  platforms: ["YouTube", "Instagram", "TikTok"],
};

const dictionaries: Record<Locale, SiteDictionary> = {
  es: {
    metadata: {
      title: "Digital Clip Agency",
      description:
        "Agencia de edición de video para creadores de contenido en YouTube, Instagram y TikTok.",
      keywords: [
        "edición de video",
        "agencia de contenido",
        "YouTube",
        "Instagram",
        "TikTok",
        "creadores de contenido",
      ],
    },
    agency: baseAgencyData,
    navigation: [
      { label: "Inicio", href: "#home" },
      { label: "Servicios", href: "#services" },
      { label: "Portafolio", href: "#portfolio" },
      { label: "Nosotros", href: "#about" },
      { label: "Contacto", href: "#contact" },
    ],
    languageSwitcher: {
      label: "English",
      shortLabel: "EN",
      toggleLabel: "Cambiar idioma",
    },
    hero: {
      eyebrow: "Edición profesional para creadores de contenido",
      title: "Edita menos, crea más.",
      description:
        "Editamos tus videos para aumentar retención y views en YouTube, Instagram y TikTok.",
      socialProof: "+7M views generados en contenido editado por nosotros.",
      primaryCta: { label: "Ver ejemplos reales", href: "#portfolio" },
      secondaryCta: { label: "Envíanos un mensaje", href: "#contact" },
      imageAlts: {
        first: "Imagen de Reel de instagram con más de 50000 likes y 900 comentarios",
        second: "Imagen de Reel de instagram con más de 140000 likes y 16000 comentarios",
        third: "Imagen de Reel de instagram con más de 35000 likes y 1500 comentarios",
      },
    },
    services: {
      eyebrow: "Servicios",
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
      eyebrow: "Portafolio",
      title: "Ejemplos reales de edición para creadores",
      description:
        "Una muestra de videos producidos por la agencia para que puedas ver el tipo de edición, ritmo y presentación que desarrollan.",
      errorTitle: "No pudimos cargar el portafolio ahora mismo.",
      errorDescription:
        "El resto del sitio sigue disponible. Intenta nuevamente en unos minutos para ver los proyectos publicados.",
      emptyTitle: "Proyectos próximamente.",
      emptyDescription:
        "Estamos preparando una selección de trabajos para mostrar el estilo, la claridad narrativa y el nivel de edición de la agencia.",
    },
    about: {
      eyebrow: "Nosotros",
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
      eyebrow: "Contacto",
      title: "Hablemos de tu contenido",
      description:
        "Si quieres delegar la edición y mantener tu contenido activo, escríbenos por correo y te responderemos con el siguiente paso.",
      emailLabel: "Email",
      ctaLabel: "Enviar email",
      instagramLabel: "Instagram",
      copyEmailLabel: "Copiar email",
      copiedEmailLabel: "Email copiado",
    },
    footer: {
      copyright: "© 2026 Digital Clip Agency. Edición estratégica para creadores.",
      instagramLabel: "Instagram",
    },
    notFound: {
      title: "404 - Página no encontrada",
      description: "La página que estás buscando no existe o fue movida.",
      ctaLabel: "Volver al inicio",
    },
    mobileNav: {
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      title: "Menú",
    },
  },
  en: {
    metadata: {
      title: "Digital Clip Agency",
      description:
        "Video editing agency for content creators on YouTube, Instagram, and TikTok.",
      keywords: [
        "video editing",
        "content agency",
        "YouTube",
        "Instagram",
        "TikTok",
        "content creators",
      ],
    },
    agency: baseAgencyData,
    navigation: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    languageSwitcher: {
      label: "Español",
      shortLabel: "ES",
      toggleLabel: "Change language",
    },
    hero: {
      eyebrow: "Professional editing for content creators",
      title: "Edit less, create more.",
      description:
        "We edit your videos to increase retention and views on YouTube, Instagram, and TikTok.",
      socialProof: "+7M views generated on videos edited by our team.",
      primaryCta: { label: "See real examples", href: "#portfolio" },
      secondaryCta: { label: "Send us a message", href: "#contact" },
      imageAlts: {
        first: "Instagram Reel screenshot with over 50000 likes and 900 comments",
        second:
          "Instagram Reel screenshot with over 140000 likes and 16000 comments",
        third: "Instagram Reel screenshot with over 35000 likes and 1500 comments",
      },
    },
    services: {
      eyebrow: "Services",
      title: "What we do for your content",
      description:
        "Your time is more valuable creating than editing. Let professionals handle it so you can publish with clarity, rhythm, and consistency.",
      items: [
        {
          title: "Short-form video editing",
          icon: "/video-production.svg",
          description:
            "Videos optimized to capture attention and improve retention on TikTok, Reels, and Shorts.",
        },
        {
          title: "Optimization for growth",
          icon: "/social-optimization.svg",
          description:
            "We fine-tune pacing, subtitles, and structure to boost views and engagement.",
        },
        {
          title: "Consistent content workflow",
          icon: "/visual-narration.svg",
          description:
            "We help you publish consistently without sacrificing quality or time.",
        },
      ],
    },
    portfolio: {
      eyebrow: "Portfolio",
      title: "Real editing examples for creators",
      description:
        "A sample of videos produced by the agency so you can evaluate our editing style, pacing, and presentation quality.",
      errorTitle: "We couldn't load the portfolio right now.",
      errorDescription:
        "The rest of the site is still available. Please try again in a few minutes to see published projects.",
      emptyTitle: "Projects coming soon.",
      emptyDescription:
        "We're preparing a curated selection of work to showcase our style, narrative clarity, and editing quality.",
    },
    about: {
      eyebrow: "About",
      title: "We edit so you can focus on creating",
      description:
        "Digital Clip Agency helps creators save hours of work so they can focus on recording, publishing, and growing their channel with fast and reliable delivery.",
      points: [
        "You record, we make it perform.",
        "We don't just edit, we optimize your content for growth.",
        "Focus on creating while we sustain your publishing rhythm.",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your content",
      description:
        "If you want to delegate editing and keep your content active, email us and we'll reply with the next step.",
      emailLabel: "Email",
      ctaLabel: "Send email",
      instagramLabel: "Instagram",
      copyEmailLabel: "Copy email",
      copiedEmailLabel: "Email copied",
    },
    footer: {
      copyright: "© 2026 Digital Clip Agency. Strategic editing for creators.",
      instagramLabel: "Instagram",
    },
    notFound: {
      title: "404 - Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
      ctaLabel: "Back to homepage",
    },
    mobileNav: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      title: "Menu",
    },
  },
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale];
}

export type { SiteDictionary };
