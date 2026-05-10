import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

const { createMock, updateMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
  updateMock: vi.fn(),
}));

vi.mock("@/actions/admin/portfolio-items-actions", () => ({
  handleCreateItem: createMock,
  handleUpdateItem: updateMock,
}));

import PortfolioModal from "@/components/admin/portfolio-modal";

describe("PortfolioModal", () => {
  beforeEach(() => {
    createMock.mockReset();
    updateMock.mockReset();

    HTMLDialogElement.prototype.showModal = vi.fn();
  });

  it("opens the dialog on mount and creates an item in create mode", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();

    render(
      <PortfolioModal mode="create" onClose={onClose} onSuccess={onSuccess} />
    );

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Proyecto nuevo" },
    });
    fireEvent.change(screen.getByLabelText("Miniatura"), {
      target: { value: "https://i.ytimg.com/vi/abc/hqdefault.jpg" },
    });
    fireEvent.change(screen.getByLabelText("URL"), {
      target: { value: "https://www.youtube.com/watch?v=abc" },
    });
    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Descripcion valida" },
    });

    fireEvent.submit(
      screen
        .getByRole("button", { name: "Crear", hidden: true })
        .closest("form")!
    );

    await waitFor(() => {
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("submits update mode with the hidden id field", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();

    render(
      <PortfolioModal
        mode="edit"
        item={{
          id: "item-1",
          title: "Proyecto 1",
          platform: "YouTube",
          thumbnail: "https://i.ytimg.com/vi/abc/hqdefault.jpg",
          href: "https://www.youtube.com/watch?v=abc",
          description: "Descripcion valida",
          published: true,
          featured: false,
          sortOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    fireEvent.submit(
      screen
        .getByRole("button", { name: "Actualizar", hidden: true })
        .closest("form")!
    );

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("closes when the close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <PortfolioModal mode="create" onClose={onClose} onSuccess={vi.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cerrar", hidden: true }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
