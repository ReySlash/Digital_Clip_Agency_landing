import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { refreshMock, setAdminLocaleMock } = vi.hoisted(() => ({
  refreshMock: vi.fn(),
  setAdminLocaleMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

vi.mock("@/actions/admin/set-admin-locale-action", () => ({
  setAdminLocaleAction: setAdminLocaleMock,
}));

import AdminLanguageSwitcher from "@/components/admin/admin-language-switcher";
import { getAdminDictionary } from "@/lib/admin-dictionaries";

describe("AdminLanguageSwitcher", () => {
  it("renders both labels and toggles to the opposite locale on click", async () => {
    const dictionary = getAdminDictionary("es");

    render(
      <AdminLanguageSwitcher
        locale="es"
        dictionary={dictionary.languageSwitcher}
      />
    );

    expect(screen.getByText("ES")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: dictionary.languageSwitcher.ariaLabel,
      })
    );

    await waitFor(() => {
      expect(setAdminLocaleMock).toHaveBeenCalledWith("en");
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });
  });
});

