import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

const { handleRemoveItemMock, refreshMock } = vi.hoisted(() => ({
  handleRemoveItemMock: vi.fn(),
  refreshMock: vi.fn(),
}));

vi.mock("@/actions/admin/portfolio-items-actions", () => ({
  handleRemoveItem: handleRemoveItemMock,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

import RemoveItemButton from "@/components/admin/remove-item-button";

describe("RemoveItemButton", () => {
  beforeEach(() => {
    handleRemoveItemMock.mockReset();
    refreshMock.mockReset();
  });

  it("removes the item and refreshes after confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    handleRemoveItemMock.mockResolvedValue(undefined);

    render(<RemoveItemButton itemId="item-1" />);

    fireEvent.click(screen.getByRole("button", { name: /eliminar proyecto/i }));

    await waitFor(() => {
      expect(handleRemoveItemMock).toHaveBeenCalledWith("item-1");
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });
  });

  it("does nothing when confirmation is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<RemoveItemButton itemId="item-1" />);

    fireEvent.click(screen.getByRole("button", { name: /eliminar proyecto/i }));

    expect(handleRemoveItemMock).not.toHaveBeenCalled();
    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("shows an alert when removal fails", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    handleRemoveItemMock.mockRejectedValue(new Error("delete failed"));

    render(<RemoveItemButton itemId="item-1" />);

    fireEvent.click(screen.getByRole("button", { name: /eliminar proyecto/i }));

    await waitFor(() => {
      expect(handleRemoveItemMock).toHaveBeenCalledWith("item-1");
      expect(alertMock).toHaveBeenCalledWith(
        "No se pudo eliminar el proyecto. Intenta nuevamente en unos segundos.",
      );
    });

    expect(refreshMock).not.toHaveBeenCalled();
  });
});
