"use client";

import { useEffect, useRef } from "react";
import { PortfolioItem } from "@prisma/client";
import {
  handleCreateItem,
  handleUpdateItem,
} from "@/actions/admin/portfolio-items-actions";

type Props = {
  mode: "edit" | "create";
  item?: PortfolioItem;
  onClose: () => void;
  onSuccess: () => void;
};

const PLATFORMS = ["YouTube", "Instagram", "TikTok"];

function PortfolioModal({ mode, item, onClose, onSuccess }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const title = mode === "edit" ? "Editar elemento" : "Crear nuevo elemento";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (mode === "edit") {
      await handleUpdateItem(formData);
    } else {
      await handleCreateItem(formData);
    }
    onSuccess();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto max-h-[90vh] w-[90vw] max-w-xl overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-linear-to-br from-[#0c1338] via-[#13215a] to-[#1d4ed8] text-white p-4 rounded-lg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#57d9ff]">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {mode === "edit" && item && (
          <input type="hidden" name="id" value={item.id} />
        )}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">Título</span>
          <input
            type="text"
            name="title"
            defaultValue={item?.title || ""}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">Plataforma</span>
          <select
            name="platform"
            defaultValue={item?.platform || "YouTube"}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">Miniatura</span>
          <input
            type="url"
            name="thumbnail"
            defaultValue={item?.thumbnail || ""}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">URL</span>
          <input
            type="url"
            name="href"
            defaultValue={item?.href || ""}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">Descripción</span>
          <textarea
            name="description"
            defaultValue={item?.description || ""}
            rows={4}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff] resize-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">Orden</span>
          <input
            type="number"
            name="sortOrder"
            defaultValue={item?.sortOrder || 0}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
        </label>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={item?.featured || false}
              className="w-4 h-4 text-[#57d9ff] bg-white/5 border-gray-700 rounded focus:ring-[#57d9ff] focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-300">
              Marcar como destacado
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={item?.published || false}
              className="w-4 h-4 text-[#57d9ff] bg-white/5 border-gray-700 rounded focus:ring-[#57d9ff] focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-300">
              Marcar como publicado
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="self-end mt-4 px-6 py-2 bg-[#57d9ff] text-[#101841] rounded-full hover:bg-white transition-colors duration-150"
        >
          {mode === "edit" ? "Actualizar" : "Crear"}
        </button>
      </form>
    </dialog>
  );
}

export default PortfolioModal;
