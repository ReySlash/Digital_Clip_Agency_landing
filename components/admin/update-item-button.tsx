"use client";
import { usePortfolioModal } from "@/contexts/portfolio-modal-context";
import { PortfolioItem } from "@prisma/client";
import Image from "next/image";

type Props = {
  item: PortfolioItem;
};

function UpdateItemButton(props: Props) {
  const { item } = props;
  const { openEdit } = usePortfolioModal();
  return (
    <button onClick={() => openEdit(item)}>
      <Image
        className="w-6 h-auto invert hover:scale-110 transition-transform duration-150"
        src="/actions/editIcon.svg"
        alt=""
        width={100}
        height={100}
      />
    </button>
  );
}

export default UpdateItemButton;
