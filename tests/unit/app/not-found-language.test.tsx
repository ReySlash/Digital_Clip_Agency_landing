import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PUBLIC_LOCALE_COOKIE } from "@/lib/i18n";

const { headersMock } = vi.hoisted(() => ({
  headersMock: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: headersMock,
  cookies: vi.fn().mockResolvedValue({
    get: () => undefined,
  }),
}));

import NotFound from "@/app/not-found";

describe("app/not-found language selection", () => {
  it("renders english copy when accept-language prefers english", async () => {
    headersMock.mockResolvedValue(new Headers({ "accept-language": "en-US,en;q=0.9" }));

    render(await NotFound());

    expect(screen.getByText("404 - Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist or has been moved.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute(
      "href",
      "/en"
    );
  });

  it("renders spanish copy when accept-language prefers spanish", async () => {
    headersMock.mockResolvedValue(new Headers({ "accept-language": "es-ES,es;q=0.9" }));

    render(await NotFound());

    expect(screen.getByText("404 - Página no encontrada")).toBeInTheDocument();
    expect(
      screen.getByText("La página que estás buscando no existe o fue movida.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute(
      "href",
      "/es"
    );
  });

  it("prefers cookie locale over accept-language", async () => {
    headersMock.mockResolvedValue(new Headers({ "accept-language": "es-ES,es;q=0.9" }));
    const { cookies } = await import("next/headers");
    (cookies as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      get: (name: string) =>
        name === PUBLIC_LOCALE_COOKIE ? { value: "en" } : undefined,
    });

    render(await NotFound());

    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute(
      "href",
      "/en"
    );
  });
});
