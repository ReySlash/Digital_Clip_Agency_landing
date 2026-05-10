import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const { clearAdminFeedbackMock, usePortfolioModalMock } = vi.hoisted(() => ({
  clearAdminFeedbackMock: vi.fn(),
  usePortfolioModalMock: vi.fn(),
}));

vi.mock("@/contexts/portfolio-modal-context", () => ({
  usePortfolioModal: usePortfolioModalMock,
}));

import AdminFeedbackBanner from "@/components/admin/admin-feedback-banner";

describe("AdminFeedbackBanner", () => {
  beforeEach(() => {
    clearAdminFeedbackMock.mockReset();
    usePortfolioModalMock.mockReset();
  });

  it("renders nothing when there is no feedback", () => {
    usePortfolioModalMock.mockReturnValue({
      adminFeedback: null,
      clearAdminFeedback: clearAdminFeedbackMock,
    });

    const { container } = render(<AdminFeedbackBanner />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders success feedback and clears it manually", () => {
    usePortfolioModalMock.mockReturnValue({
      adminFeedback: {
        message: "Proyecto eliminado correctamente.",
        tone: "success",
      },
      clearAdminFeedback: clearAdminFeedbackMock,
    });

    render(<AdminFeedbackBanner />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Proyecto eliminado correctamente."
    );

    fireEvent.click(screen.getByRole("button", { name: /cerrar/i }));

    expect(clearAdminFeedbackMock).toHaveBeenCalledTimes(1);
  });

  it("renders error feedback as an alert", () => {
    usePortfolioModalMock.mockReturnValue({
      adminFeedback: {
        message:
          "No se pudo eliminar el proyecto. Intenta nuevamente en unos segundos.",
        tone: "error",
      },
      clearAdminFeedback: clearAdminFeedbackMock,
    });

    render(<AdminFeedbackBanner />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "No se pudo eliminar el proyecto. Intenta nuevamente en unos segundos."
    );
  });
});
