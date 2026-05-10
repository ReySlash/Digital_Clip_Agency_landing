import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const { signOutMock } = vi.hoisted(() => ({
  signOutMock: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signOut: signOutMock,
}));

import LogoutButton from "@/components/admin/logout-button";

describe("LogoutButton", () => {
  beforeEach(() => {
    signOutMock.mockReset();
  });

  it("calls signOut after confirmation", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(signOutMock).toHaveBeenCalledWith({
      redirect: true,
      callbackUrl: "/admin/login",
    });
  });

  it("does nothing when confirmation is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(signOutMock).not.toHaveBeenCalled();
  });
});
