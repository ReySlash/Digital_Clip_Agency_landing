"use client";

import { handleRemoveItem } from "@/actions/admin/portfolio-items-actions";
import Image from "next/image";

type Props = {
  itemId: string;
};

function RemoveItemButton({ itemId }: Props) {
  const handleClick = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      handleRemoveItem(itemId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 transition hover:border-red-400/40 hover:bg-red-500/20"
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
