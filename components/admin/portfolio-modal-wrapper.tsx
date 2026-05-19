"use client";

import { usePortfolioModal } from "@/contexts/portfolio-modal-context";
import PortfolioModal from "./portfolio-modal";

import { useRouter } from "next/navigation";
import type { AdminDictionary } from "@/lib/admin-dictionaries";

type Props = {
  dictionary: AdminDictionary["modal"];
};

export default function PortfolioModalWrapper({ dictionary }: Props) {
  const { modalState, closeModal } = usePortfolioModal();
  const router = useRouter();

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <PortfolioModal
      mode={modalState.mode}
      item={modalState.item ?? undefined}
      dictionary={dictionary}
      onClose={closeModal}
      onSuccess={() => router.refresh()}
    />
  );
}
