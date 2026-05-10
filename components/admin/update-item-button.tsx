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
    <button
      type="button"
      onClick={() => openEdit(item)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#57d9ff]/50 hover:bg-[#57d9ff]/10"
      aria-label={`Editar ${item.title}`}
      title="Editar proyecto"
    >
      <Image
        className="h-auto w-5 invert transition-transform duration-150 hover:scale-110"
        src="/actions/editIcon.svg"
        alt=""
        width={100}
        height={100}
      />
    </button>
  );
}

export default UpdateItemButton;
