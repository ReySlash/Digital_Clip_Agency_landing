/* eslint-disable @next/next/no-img-element */

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

const { getPublishedPortfolioSectionDataMock } = vi.hoisted(() => ({
  getPublishedPortfolioSectionDataMock: vi.fn(),
}));

vi.mock("@/lib/portfolio-data", () => ({
  getPublishedPortfolioSectionData: getPublishedPortfolioSectionDataMock,
}));

vi.mock("@/components/shared/scroll-reveal", () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => <img {...props} alt={props.alt ?? ""} />,
}));

import {
  PortfolioSection,
  PortfolioSectionContent,
  PortfolioSectionLoading,
} from "@/components/landing/portfolio-section";
import { getDictionary } from "@/lib/dictionaries";

const dictionary = getDictionary("es");
const englishDictionary = getDictionary("en");

describe("PortfolioSection", () => {
  beforeEach(() => {
    getPublishedPortfolioSectionDataMock.mockReset();
  });

  it("renders the section heading and loading fallback", () => {
    render(<PortfolioSection dictionary={dictionary} />);

    expect(screen.getByText("Portafolio")).toBeInTheDocument();
    expect(screen.getByText(dictionary.portfolio.title)).toBeInTheDocument();
    expect(screen.getByText(dictionary.portfolio.description)).toBeInTheDocument();
  });

  it("renders the loading skeleton cards", () => {
    const { container } = render(<PortfolioSectionLoading />);

    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("renders the empty state when no published items exist", async () => {
    getPublishedPortfolioSectionDataMock.mockResolvedValue({
      status: "empty",
      items: [],
    });

    render(await PortfolioSectionContent({ dictionary }));

    expect(screen.getByText("Proyectos próximamente.")).toBeInTheDocument();
  });

  it("renders the error state when the portfolio cannot be loaded", async () => {
    getPublishedPortfolioSectionDataMock.mockResolvedValue({
      status: "error",
      items: [],
    });

    render(await PortfolioSectionContent({ dictionary }));

    expect(
      screen.getByText("No pudimos cargar el portafolio ahora mismo.")
    ).toBeInTheDocument();
  });

  it("renders published portfolio cards when data is available", async () => {
    getPublishedPortfolioSectionDataMock.mockResolvedValue({
      status: "success",
      items: [
        {
          id: "item-1",
          title: "Proyecto 1",
          platform: "YouTube",
          thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
          href: "https://www.youtube.com/watch?v=abc",
          description: "Descripcion del proyecto",
          published: true,
          featured: true,
          sortOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    render(await PortfolioSectionContent({ dictionary }));

    expect(screen.getByText("Proyecto 1")).toBeInTheDocument();
    expect(screen.getByText("Descripcion del proyecto")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /proyecto 1/i })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=abc"
    );
  });

  it("keeps database portfolio text on english pages as a fallback", async () => {
    getPublishedPortfolioSectionDataMock.mockResolvedValue({
      status: "success",
      items: [
        {
          id: "item-2",
          title: "Proyecto en español",
          platform: "Instagram",
          thumbnail: "https://example.com/thumb.jpg",
          href: "https://instagram.com/reel/abc",
          description: "Descripción en español desde la base de datos.",
          published: true,
          featured: false,
          sortOrder: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    render(await PortfolioSectionContent({ dictionary: englishDictionary }));

    expect(screen.getByText("Proyecto en español")).toBeInTheDocument();
    expect(screen.getByText("Descripción en español desde la base de datos.")).toBeInTheDocument();
  });
});
