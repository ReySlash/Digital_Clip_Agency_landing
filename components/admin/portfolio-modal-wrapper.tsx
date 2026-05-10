"use client";

import { usePortfolioModal } from "@/contexts/portfolio-modal-context";
import PortfolioModal from "./portfolio-modal";

import { useRouter } from "next/navigation";

export default function PortfolioModalWrapper() {
  const { modalState, closeModal } = usePortfolioModal();
  const router = useRouter();

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <PortfolioModal
      mode={modalState.mode}
      item={modalState.item ?? undefined}
      onClose={closeModal}
      onSuccess={() => router.refresh()}
    />
  );
}
