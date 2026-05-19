"use client";

import { usePortfolioModal } from "@/contexts/portfolio-modal-context";

type Props = {
  label: string;
};

function CreateItemButton({ label }: Props) {
  const { openCreate } = usePortfolioModal();

  return (
    <button
      onClick={openCreate}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
    >
      {label}
    </button>
  );
}

export default CreateItemButton;
