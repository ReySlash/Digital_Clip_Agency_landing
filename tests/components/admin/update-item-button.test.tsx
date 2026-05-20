/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const { openEditMock } = vi.hoisted(() => ({
  openEditMock: vi.fn(),
}));

vi.mock("@/contexts/portfolio-modal-context", () => ({
  usePortfolioModal: () => ({
    openEdit: openEditMock,
  }),
}));

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => <img {...props} alt="" />,
}));

import UpdateItemButton from "@/components/admin/update-item-button";
import { getAdminDictionary } from "@/lib/admin-dictionaries";

describe("UpdateItemButton", () => {
  beforeEach(() => {
    openEditMock.mockReset();
  });

  it("opens the edit modal with the current item", () => {
    const dictionary = getAdminDictionary("es");
    const item = {
      id: "item-1",
      titleES: "Proyecto 1",
      titleEN: "Project 1",
      platform: "YouTube",
      thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
      href: "https://www.youtube.com/watch?v=abc",
      descriptionES: "Descripcion valida",
      descriptionEN: "Valid description",
      published: true,
      featured: false,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    render(
      <UpdateItemButton
        item={item}
        ariaLabelPrefix={dictionary.portfolioTable.update.ariaLabelPrefix}
        titleLabel={dictionary.portfolioTable.update.title}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /editar proyecto 1/i }));

    expect(openEditMock).toHaveBeenCalledTimes(1);
    expect(openEditMock).toHaveBeenCalledWith(item);
  });
});
