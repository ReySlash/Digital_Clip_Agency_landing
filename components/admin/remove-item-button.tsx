"use client";

import { handleRemoveItem } from "@/actions/admin/portfolio-items-actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Props = {
  itemId: string;
};

function RemoveItemButton({ itemId }: Props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      setIsPending(true);

      try {
        await handleRemoveItem(itemId);
        router.refresh();
      } catch (error) {
        console.error("Error removing portfolio item:", error);
        window.alert(
          "No se pudo eliminar el proyecto. Intenta nuevamente en unos segundos.",
        );
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
      aria-label="Eliminar proyecto"
      title="Eliminar proyecto"
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
