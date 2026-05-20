import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { getAdminDictionary } from "@/lib/admin-dictionaries";

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

  function fillCreateForm() {
    fireEvent.change(screen.getByLabelText("Título (ES)"), {
      target: { value: "Proyecto nuevo" },
    });
    fireEvent.change(screen.getByLabelText("Título (EN)"), {
      target: { value: "New project" },
    });
    fireEvent.change(screen.getByLabelText("Miniatura"), {
      target: { value: "https://i.ytimg.com/vi/abc/hqdefault.jpg" },
    });
    fireEvent.change(screen.getByLabelText("URL"), {
      target: { value: "https://www.youtube.com/watch?v=abc" },
    });
    fireEvent.change(screen.getByLabelText("Descripción (ES)"), {
      target: { value: "Descripcion valida" },
    });
    fireEvent.change(screen.getByLabelText("Descripción (EN)"), {
      target: { value: "Valid description" },
    });
  }

  it("opens the dialog on mount and creates an item in create mode", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    createMock.mockResolvedValue({ success: true });
    const dictionary = getAdminDictionary("es");

    render(
      <PortfolioModal
        mode="create"
        dictionary={dictionary.modal}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    fillCreateForm();

    fireEvent.submit(
      screen
        .getByRole("button", { name: "Crear", hidden: true })
        .closest("form")!
    );

    await waitFor(() => {
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledTimes(1);
      expect(
        screen.getByText("Proyecto creado correctamente.")
      ).toBeInTheDocument();
    });

    expect(onClose).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 1300));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("submits update mode with the hidden id field", async () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    updateMock.mockResolvedValue({ success: true });
    const dictionary = getAdminDictionary("es");

    render(
      <PortfolioModal
        mode="edit"
        dictionary={dictionary.modal}
        item={{
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
      expect(
        screen.getByText("Proyecto actualizado correctamente.")
      ).toBeInTheDocument();
    });

    expect(updateMock.mock.calls[0]?.[0].get("id")).toBe("item-1");
    expect(onClose).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 1300));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("closes when the close button is clicked", () => {
    const onClose = vi.fn();
    const dictionary = getAdminDictionary("es");

    render(
      <PortfolioModal
        mode="create"
        dictionary={dictionary.modal}
        onClose={onClose}
        onSuccess={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cerrar", hidden: true }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows validation errors returned by the action", async () => {
    createMock.mockResolvedValue({
      success: false,
      errors: {
        titleES: ["El titulo en español es obligatorio."],
        thumbnail: ["Debes ingresar una URL valida."],
      },
    });
    const dictionary = getAdminDictionary("es");

    render(
      <PortfolioModal
        mode="create"
        dictionary={dictionary.modal}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
      />
    );

    fillCreateForm();

    fireEvent.submit(
      screen
        .getByRole("button", { name: "Crear", hidden: true })
        .closest("form")!
    );

    expect(
      await screen.findByText("Revisa los campos marcados e inténtalo de nuevo.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("El titulo en español es obligatorio.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Debes ingresar una URL valida.")
    ).toBeInTheDocument();
  });

  it("shows a generic form error when the action throws", async () => {
    createMock.mockRejectedValue(new Error("network"));
    const dictionary = getAdminDictionary("es");

    render(
      <PortfolioModal
        mode="create"
        dictionary={dictionary.modal}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
      />
    );

    fillCreateForm();

    fireEvent.submit(
      screen
        .getByRole("button", { name: "Crear", hidden: true })
        .closest("form")!
    );

    expect(
      await screen.findByText(
        "Ocurrió un error inesperado. Intenta nuevamente en unos segundos."
      )
    ).toBeInTheDocument();
  });
});
