import { render, screen } from "@testing-library/react";

import { LoginPageShell } from "@/components/admin/login-page-shell";
import { getAdminDictionary } from "@/lib/admin-dictionaries";

describe("LoginPageShell", () => {
  it("renders the static login shell content", () => {
    const dictionary = getAdminDictionary("es");
    render(
      <LoginPageShell
        eyebrow={dictionary.login.eyebrow}
        title={dictionary.login.title}
        description={dictionary.login.description}
        backToSiteLabel={dictionary.login.backToSite}
      >
        <div>Contenido de prueba</div>
      </LoginPageShell>
    );

    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(
      screen.getByText(/accede para gestionar el portafolio/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /volver al sitio/i })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("can render the invalid credentials state inside the shell", () => {
    const dictionary = getAdminDictionary("es");
    render(
      <LoginPageShell
        eyebrow={dictionary.login.eyebrow}
        title={dictionary.login.title}
        description={dictionary.login.description}
        backToSiteLabel={dictionary.login.backToSite}
      >
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Credenciales inválidas. Verifica tu email y contraseña.
        </p>
      </LoginPageShell>
    );

    expect(
      screen.getByText(/credenciales inválidas/i)
    ).toBeInTheDocument();
  });
});
