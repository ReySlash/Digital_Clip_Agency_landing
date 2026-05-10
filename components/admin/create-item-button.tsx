"use client";

import { usePortfolioModal } from "@/contexts/portfolio-modal-context";

function CreateItemButton() {
  const { openCreate } = usePortfolioModal();

  return (
    <button
      onClick={openCreate}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
    >
      Nuevo proyecto
    </button>
  );
}

export default CreateItemButton;
