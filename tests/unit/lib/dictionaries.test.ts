import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/dictionaries";

describe("dictionaries", () => {
  it("returns localized copy for spanish and english", () => {
    const spanish = getDictionary("es");
    const english = getDictionary("en");

    expect(spanish.navigation[0]?.label).toBe("Inicio");
    expect(english.navigation[0]?.label).toBe("Home");
    expect(spanish.hero.title).not.toBe(english.hero.title);
    expect(spanish.notFound.title).toBe("404 - Página no encontrada");
    expect(english.notFound.title).toBe("404 - Page not found");
  });
});
