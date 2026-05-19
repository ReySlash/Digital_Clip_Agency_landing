/* eslint-disable @next/next/no-img-element */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { getAdminDictionary } from "@/lib/admin-dictionaries";

const { handleRemoveItemMock, refreshMock, setAdminFeedbackMock } = vi.hoisted(() => ({
  handleRemoveItemMock: vi.fn(),
  refreshMock: vi.fn(),
  setAdminFeedbackMock: vi.fn(),
}));

vi.mock("@/actions/admin/portfolio-items-actions", () => ({
  handleRemoveItem: handleRemoveItemMock,
}));

vi.mock("@/contexts/portfolio-modal-context", () => ({
  usePortfolioModal: () => ({
    setAdminFeedback: setAdminFeedbackMock,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => <img {...props} alt="" />,
}));

import RemoveItemButton from "@/components/admin/remove-item-button";

describe("RemoveItemButton", () => {
  beforeEach(() => {
    handleRemoveItemMock.mockReset();
    refreshMock.mockReset();
    setAdminFeedbackMock.mockReset();
  });

  it("shows success feedback and refreshes after confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    handleRemoveItemMock.mockResolvedValue(undefined);
    const dictionary = getAdminDictionary("es");

    render(
      <RemoveItemButton
        itemId="item-1"
        ariaLabel={dictionary.portfolioTable.remove.ariaLabel}
        titleLabel={dictionary.portfolioTable.remove.title}
        confirmText={dictionary.portfolioTable.remove.confirm}
        successMessage={dictionary.portfolioTable.remove.success}
        errorMessage={dictionary.portfolioTable.remove.error}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /eliminar proyecto/i }));

    await waitFor(() => {
      expect(handleRemoveItemMock).toHaveBeenCalledWith("item-1");
      expect(setAdminFeedbackMock).toHaveBeenCalledWith({
        message: "Proyecto eliminado correctamente.",
        tone: "success",
      });
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });
  });

  it("does nothing when confirmation is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const dictionary = getAdminDictionary("es");

    render(
      <RemoveItemButton
        itemId="item-1"
        ariaLabel={dictionary.portfolioTable.remove.ariaLabel}
        titleLabel={dictionary.portfolioTable.remove.title}
        confirmText={dictionary.portfolioTable.remove.confirm}
        successMessage={dictionary.portfolioTable.remove.success}
        errorMessage={dictionary.portfolioTable.remove.error}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /eliminar proyecto/i }));

    expect(handleRemoveItemMock).not.toHaveBeenCalled();
    expect(setAdminFeedbackMock).not.toHaveBeenCalled();
    expect(refreshMock).not.toHaveBeenCalled();
  });

  it("shows inline error feedback when removal fails", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    handleRemoveItemMock.mockRejectedValue(new Error("delete failed"));
    const dictionary = getAdminDictionary("es");

    render(
      <RemoveItemButton
        itemId="item-1"
        ariaLabel={dictionary.portfolioTable.remove.ariaLabel}
        titleLabel={dictionary.portfolioTable.remove.title}
        confirmText={dictionary.portfolioTable.remove.confirm}
        successMessage={dictionary.portfolioTable.remove.success}
        errorMessage={dictionary.portfolioTable.remove.error}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /eliminar proyecto/i }));

    await waitFor(() => {
      expect(handleRemoveItemMock).toHaveBeenCalledWith("item-1");
      expect(setAdminFeedbackMock).toHaveBeenCalledWith({
        message:
          "No se pudo eliminar el proyecto. Intenta nuevamente en unos segundos.",
        tone: "error",
      });
    });

    expect(refreshMock).not.toHaveBeenCalled();
  });
});
