import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import NotFound from "@/app/not-found";

describe("app/not-found language selection", () => {
  it("renders default english copy and links back to /en", () => {
    render(<NotFound />);
    expect(screen.getByText("404 - Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist or has been moved.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute(
      "href",
      "/en"
    );
  });
});
