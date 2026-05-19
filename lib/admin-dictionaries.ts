import type { Locale } from "@/lib/i18n";

export type AdminDictionary = {
  languageSwitcher: {
    ariaLabel: string;
    labelEs: string;
    labelEn: string;
  };
  login: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    invalidCredentials: string;
    rateLimited: string;
    submitIdle: string;
    submitPending: string;
    backToSite: string;
  };
  admin: {
    metaTitle: string;
    metaDescription: string;
    headerBrand: string;
    headerTitle: string;
    summaryEyebrow: string;
    summaryTitle: string;
    summaryDescription: string;
    totalProjectsLabel: string;
    portfolioEyebrow: string;
    portfolioTitle: string;
    createButton: string;
  };
  feedbackBanner: {
    closeLabel: string;
  };
  portfolioTable: {
    headers: {
      project: string;
      platform: string;
      status: string;
      description: string;
      link: string;
      actions: string;
    };
    emptyState: string;
    badges: {
      published: string;
      draft: string;
      featured: string;
      normal: string;
    };
    update: {
      ariaLabelPrefix: string;
      title: string;
    };
    remove: {
      ariaLabel: string;
      title: string;
      confirm: string;
      success: string;
      error: string;
    };
  };
  logout: {
    label: string;
    confirm: string;
  };
  modal: {
    titleCreate: string;
    titleEdit: string;
    submitCreate: string;
    submitEdit: string;
    saving: string;
    closeAriaLabel: string;
    formErrorValidation: string;
    formErrorGeneric: string;
    successCreate: string;
    successEdit: string;
    fields: {
      title: string;
      platform: string;
      thumbnail: string;
      url: string;
      description: string;
      sortOrder: string;
      featured: string;
      published: string;
    };
  };
};

const dictionaries: Record<Locale, AdminDictionary> = {
  es: {
    languageSwitcher: {
      ariaLabel: "Cambiar idioma del admin",
      labelEs: "ES",
      labelEn: "EN",
    },
    login: {
      eyebrow: "Panel de administración",
      title: "Iniciar sesión",
      description:
        "Accede para gestionar el portafolio de Digital Clip Agency.",
      emailLabel: "Email",
      emailPlaceholder: "admin@digitalclipagency.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "••••••••",
      invalidCredentials:
        "Credenciales inválidas. Verifica tu email y contraseña.",
      rateLimited:
        "Demasiados intentos fallidos. Espera unos minutos antes de volver a intentar.",
      submitIdle: "Entrar al panel",
      submitPending: "Iniciando sesión...",
      backToSite: "Volver al sitio",
    },
    admin: {
      metaTitle: "Admin Panel - Digital Clip Agency",
      metaDescription: "Admin panel for managing Digital Clip Agency content",
      headerBrand: "Digital Clip Agency",
      headerTitle: "Panel de administración",
      summaryEyebrow: "Resumen",
      summaryTitle: "Gestiona los proyectos que aparecen en tu portafolio.",
      summaryDescription:
        "Edita el contenido publicado, ajusta el orden de visualización y mantén la selección destacada alineada con el trabajo más fuerte de la agencia.",
      totalProjectsLabel: "Proyectos totales",
      portfolioEyebrow: "Portafolio",
      portfolioTitle: "Biblioteca de proyectos",
      createButton: "Nuevo proyecto",
    },
    feedbackBanner: {
      closeLabel: "Cerrar",
    },
    portfolioTable: {
      headers: {
        project: "Proyecto",
        platform: "Plataforma",
        status: "Estado",
        description: "Descripción",
        link: "Enlace",
        actions: "Acciones",
      },
      emptyState:
        "Todavía no hay proyectos cargados. Crea el primero para empezar a construir el portafolio.",
      badges: {
        published: "Publicado",
        draft: "Borrador",
        featured: "Destacado",
        normal: "Normal",
      },
      update: {
        ariaLabelPrefix: "Editar",
        title: "Editar proyecto",
      },
      remove: {
        ariaLabel: "Eliminar proyecto",
        title: "Eliminar proyecto",
        confirm: "¿Estás seguro de que quieres eliminar este proyecto?",
        success: "Proyecto eliminado correctamente.",
        error:
          "No se pudo eliminar el proyecto. Intenta nuevamente en unos segundos.",
      },
    },
    logout: {
      label: "Cerrar sesión",
      confirm: "¿Estás seguro de que quieres cerrar sesión?",
    },
    modal: {
      titleCreate: "Crear nuevo elemento",
      titleEdit: "Editar elemento",
      submitCreate: "Crear",
      submitEdit: "Actualizar",
      saving: "Guardando...",
      closeAriaLabel: "Cerrar",
      formErrorValidation: "Revisa los campos marcados e inténtalo de nuevo.",
      formErrorGeneric:
        "Ocurrió un error inesperado. Intenta nuevamente en unos segundos.",
      successCreate: "Proyecto creado correctamente.",
      successEdit: "Proyecto actualizado correctamente.",
      fields: {
        title: "Título",
        platform: "Plataforma",
        thumbnail: "Miniatura",
        url: "URL",
        description: "Descripción",
        sortOrder: "Orden",
        featured: "Marcar como destacado",
        published: "Marcar como publicado",
      },
    },
  },
  en: {
    languageSwitcher: {
      ariaLabel: "Switch admin language",
      labelEs: "ES",
      labelEn: "EN",
    },
    login: {
      eyebrow: "Admin panel",
      title: "Login",
      description: "Login to manage the Digital Clip Agency portfolio.",
      emailLabel: "Email",
      emailPlaceholder: "admin@digitalclipagency.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      invalidCredentials: "Invalid credentials. Check your email and password.",
      rateLimited:
        "Too many failed attempts. Please wait a few minutes and try again.",
      submitIdle: "Enter admin",
      submitPending: "Login...",
      backToSite: "Back to site",
    },
    admin: {
      metaTitle: "Admin Panel - Digital Clip Agency",
      metaDescription: "Admin panel for managing Digital Clip Agency content",
      headerBrand: "Digital Clip Agency",
      headerTitle: "Admin panel",
      summaryEyebrow: "Overview",
      summaryTitle: "Manage the projects shown on your portfolio.",
      summaryDescription:
        "Edit published content, adjust display order, and keep featured selection aligned with the agency's strongest work.",
      totalProjectsLabel: "Total projects",
      portfolioEyebrow: "Portfolio",
      portfolioTitle: "Project library",
      createButton: "New project",
    },
    feedbackBanner: {
      closeLabel: "Close",
    },
    portfolioTable: {
      headers: {
        project: "Project",
        platform: "Platform",
        status: "Status",
        description: "Description",
        link: "Link",
        actions: "Actions",
      },
      emptyState:
        "No projects yet. Create your first one to start building the portfolio.",
      badges: {
        published: "Published",
        draft: "Draft",
        featured: "Featured",
        normal: "Normal",
      },
      update: {
        ariaLabelPrefix: "Edit",
        title: "Edit project",
      },
      remove: {
        ariaLabel: "Remove project",
        title: "Remove project",
        confirm: "Are you sure you want to delete this project?",
        success: "Project deleted successfully.",
        error:
          "Could not delete the project. Please try again in a few seconds.",
      },
    },
    logout: {
      label: "Sign out",
      confirm: "Are you sure you want to sign out?",
    },
    modal: {
      titleCreate: "Create new item",
      titleEdit: "Edit item",
      submitCreate: "Create",
      submitEdit: "Update",
      saving: "Saving...",
      closeAriaLabel: "Close",
      formErrorValidation: "Review the highlighted fields and try again.",
      formErrorGeneric: "Unexpected error. Please try again in a few seconds.",
      successCreate: "Project created successfully.",
      successEdit: "Project updated successfully.",
      fields: {
        title: "Title",
        platform: "Platform",
        thumbnail: "Thumbnail",
        url: "URL",
        description: "Description",
        sortOrder: "Order",
        featured: "Mark as featured",
        published: "Mark as published",
      },
    },
  },
};

export function getAdminDictionary(locale: Locale): AdminDictionary {
  return dictionaries[locale];
}
