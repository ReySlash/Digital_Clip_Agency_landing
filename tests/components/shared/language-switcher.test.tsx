import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { vi } from "vitest";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    ...props
  }: ComponentProps<"a"> & { href: string }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

import { LanguageSwitcher } from "@/components/shared/language-switcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
    usePathnameMock.mockReturnValue("/es/services");
    window.location.hash = "";
  });

  it("renders both language segments", () => {
    render(<LanguageSwitcher currentLocale="es" ariaLabel="Cambiar idioma" />);

    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("marks the active side and toggles to english when current is spanish", () => {
    render(<LanguageSwitcher currentLocale="es" ariaLabel="Cambiar idioma" />);

    const toggleLink = screen.getByRole("link", { name: "Cambiar idioma" });

    expect(toggleLink).toHaveAttribute("href", "/en/services");
    expect(screen.getByText("ES").className).toContain("text-[#101841]");
    expect(screen.getByText("EN").className).toContain("text-slate-300");
  });

  it("builds a single toggle link while preserving the current hash", () => {
    window.location.hash = "#portfolio";

    render(<LanguageSwitcher currentLocale="es" ariaLabel="Cambiar idioma" />);

    expect(screen.getByRole("link", { name: "Cambiar idioma" })).toHaveAttribute(
      "href",
      "/en/services#portfolio"
    );
  });

  it("supports full-width comfortable variant for mobile", () => {
    const { container } = render(
      <LanguageSwitcher
        currentLocale="en"
        ariaLabel="Change language"
        size="comfortable"
        fullWidth
      />
    );

    // Current LanguageSwitcher uses a fixed-width control even when fullWidth is set.
    expect(container.firstChild).toHaveClass("w-20");
    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("toggles back to spanish when current locale is english", () => {
    usePathnameMock.mockReturnValue("/en/about");
    render(<LanguageSwitcher currentLocale="en" ariaLabel="Change language" />);

    const toggleLink = screen.getByRole("link", { name: "Change language" });

    expect(toggleLink).toHaveAttribute("href", "/es/about");
    expect(screen.getByText("EN").className).toContain("text-[#101841]");
    expect(screen.getByText("ES").className).toContain("text-slate-300");
  });
});
