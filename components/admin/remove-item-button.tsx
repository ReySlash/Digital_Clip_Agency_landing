"use client";

import { handleRemoveItem } from "@/actions/admin/portfolio-items-actions";
import Image from "next/image";

type Props = {
  itemId: string;
};

function RemoveItemButton({ itemId }: Props) {
  const handleClick = () => {
    if (confirm("Are you sure you want to remove this item?")) {
      handleRemoveItem(itemId);
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        <Image
          className="w-6 h-auto invert hover:scale-110 transition-transform duration-150"
          src="/actions/removeIcon.svg"
          alt=""
          width={100}
          height={100}
        />
      </button>
    </>
  );
}

export default RemoveItemButton;
