import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/components/admin/update-item-button", () => ({
  default: () => <button type="button">Editar</button>,
}));

vi.mock("@/components/admin/remove-item-button", () => ({
  default: () => <button type="button">Eliminar</button>,
}));

import PortfolioTable from "@/components/admin/portfolio-table";

describe("PortfolioTable", () => {
  it("renders the empty state with no items", async () => {
    render(await PortfolioTable({ portfolioItems: [] }));

    expect(
      screen.getByText(/todavía no hay proyectos cargados/i)
    ).toBeInTheDocument();
  });

  it("renders portfolio items with badges and actions", async () => {
    render(
      await PortfolioTable({
        portfolioItems: [
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
      })
    );

    expect(screen.getByText("Proyecto 1")).toBeInTheDocument();
    expect(screen.getByText("Publicado")).toBeInTheDocument();
    expect(screen.getByText("Destacado")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /youtube/i })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=abc"
    );
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Eliminar" })).toBeInTheDocument();
  });
});
