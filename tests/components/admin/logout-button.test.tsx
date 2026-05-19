import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

const { signOutMock } = vi.hoisted(() => ({
  signOutMock: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signOut: signOutMock,
}));

import LogoutButton from "@/components/admin/logout-button";
import { getAdminDictionary } from "@/lib/admin-dictionaries";

describe("LogoutButton", () => {
  beforeEach(() => {
    signOutMock.mockReset();
  });

  it("calls signOut after confirmation", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const dictionary = getAdminDictionary("es");

    render(
      <LogoutButton
        label={dictionary.logout.label}
        confirmText={dictionary.logout.confirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(signOutMock).toHaveBeenCalledWith({
      redirect: true,
      callbackUrl: "/admin/login",
    });
  });

  it("does nothing when confirmation is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const dictionary = getAdminDictionary("es");

    render(
      <LogoutButton
        label={dictionary.logout.label}
        confirmText={dictionary.logout.confirm}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(signOutMock).not.toHaveBeenCalled();
  });
});
