"use client";

import { handleRemoveItem } from "@/actions/admin/portfolio-items-actions";
import { usePortfolioModal } from "@/contexts/portfolio-modal-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Props = {
  itemId: string;
  ariaLabel: string;
  titleLabel: string;
  confirmText: string;
  successMessage: string;
  errorMessage: string;
};

function RemoveItemButton({
  itemId,
  ariaLabel,
  titleLabel,
  confirmText,
  successMessage,
  errorMessage,
}: Props) {
  const router = useRouter();
  const { setAdminFeedback } = usePortfolioModal();
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (confirm(confirmText)) {
      setIsPending(true);

      try {
        await handleRemoveItem(itemId);
        setAdminFeedback({
          message: successMessage,
          tone: "success",
        });
        router.refresh();
      } catch (error) {
        console.error("Error removing portfolio item:", error);
        setAdminFeedback({
          message: errorMessage,
          tone: "error",
        });
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 transition hover:border-red-400/40 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={ariaLabel}
      title={titleLabel}
    >
      <Image
        className="h-auto w-5 invert transition-transform duration-150 hover:scale-110"
        src="/actions/removeIcon.svg"
        alt=""
        width={100}
        height={100}
      />
    </button>
  );
}

export default RemoveItemButton;
