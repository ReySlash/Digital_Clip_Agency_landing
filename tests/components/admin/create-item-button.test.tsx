import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { getAdminDictionary } from "@/lib/admin-dictionaries";

const { openCreateMock } = vi.hoisted(() => ({
  openCreateMock: vi.fn(),
}));

vi.mock("@/contexts/portfolio-modal-context", () => ({
  usePortfolioModal: () => ({
    openCreate: openCreateMock,
  }),
}));

import CreateItemButton from "@/components/admin/create-item-button";

describe("CreateItemButton", () => {
  beforeEach(() => {
    openCreateMock.mockReset();
  });

  it("opens the create modal when clicked", () => {
    const dictionary = getAdminDictionary("es");
    render(<CreateItemButton label={dictionary.admin.createButton} />);

    fireEvent.click(screen.getByRole("button", { name: /nuevo proyecto/i }));

    expect(openCreateMock).toHaveBeenCalledTimes(1);
  });
});
