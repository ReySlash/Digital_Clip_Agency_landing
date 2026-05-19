"use client";

import { useEffect, useRef, useState } from "react";
import { PortfolioItem } from "@prisma/client";
import {
  handleCreateItem,
  handleUpdateItem,
} from "@/actions/admin/portfolio-items-actions";
import type { AdminDictionary } from "@/lib/admin-dictionaries";

type ActionResult =
  | { success: true }
  | { success: false; errors?: Record<string, string[]> };

type Props = {
  mode: "edit" | "create";
  item?: PortfolioItem;
  dictionary: AdminDictionary["modal"];
  onClose: () => void;
  onSuccess: () => void;
};

const PLATFORMS = ["YouTube", "Instagram", "TikTok"];

function PortfolioModal({ mode, item, dictionary, onClose, onSuccess }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dialogRef.current?.showModal();

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const title = mode === "edit" ? dictionary.titleEdit : dictionary.titleCreate;
  const submitLabel =
    mode === "edit" ? dictionary.submitEdit : dictionary.submitCreate;
  const successLabel =
    mode === "edit" ? dictionary.successEdit : dictionary.successCreate;

  function getFieldError(fieldName: string) {
    return fieldErrors[fieldName]?.[0] ?? null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFieldErrors({});
    setFormError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const result: ActionResult =
        mode === "edit"
          ? await handleUpdateItem(formData)
          : await handleCreateItem(formData);

      if (!result.success) {
        setFieldErrors(result.errors ?? {});
        setFormError(dictionary.formErrorValidation);
        return;
      }

      setSuccessMessage(successLabel);
      onSuccess();

      closeTimeoutRef.current = setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      console.error("Error submitting portfolio modal:", error);
      setFormError(dictionary.formErrorGeneric);
    } finally {
      setIsSubmitting(false);
    }
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
          aria-label={dictionary.closeAriaLabel}
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

      {formError ? (
        <p
          role="alert"
          aria-live="polite"
          className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {formError}
        </p>
      ) : null}

      {successMessage ? (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
        >
          {successMessage}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {mode === "edit" && item && (
          <input type="hidden" name="id" value={item.id} />
        )}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">
            {dictionary.fields.title}
          </span>
          <input
            type="text"
            name="title"
            required
            defaultValue={item?.title || ""}
            aria-invalid={Boolean(getFieldError("title"))}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
          {getFieldError("title") ? (
            <span className="text-xs text-red-200">{getFieldError("title")}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">
            {dictionary.fields.platform}
          </span>
          <select
            name="platform"
            required
            defaultValue={item?.platform || "YouTube"}
            aria-invalid={Boolean(getFieldError("platform"))}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {getFieldError("platform") ? (
            <span className="text-xs text-red-200">{getFieldError("platform")}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">
            {dictionary.fields.thumbnail}
          </span>
          <input
            type="url"
            name="thumbnail"
            required
            defaultValue={item?.thumbnail || ""}
            aria-invalid={Boolean(getFieldError("thumbnail"))}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
          {getFieldError("thumbnail") ? (
            <span className="text-xs text-red-200">{getFieldError("thumbnail")}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">
            {dictionary.fields.url}
          </span>
          <input
            type="url"
            name="href"
            required
            defaultValue={item?.href || ""}
            aria-invalid={Boolean(getFieldError("href"))}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
          {getFieldError("href") ? (
            <span className="text-xs text-red-200">{getFieldError("href")}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">
            {dictionary.fields.description}
          </span>
          <textarea
            name="description"
            required
            defaultValue={item?.description || ""}
            rows={4}
            aria-invalid={Boolean(getFieldError("description"))}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff] resize-none"
          />
          {getFieldError("description") ? (
            <span className="text-xs text-red-200">{getFieldError("description")}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-300">
            {dictionary.fields.sortOrder}
          </span>
          <input
            type="number"
            name="sortOrder"
            min={0}
            defaultValue={item?.sortOrder || 0}
            aria-invalid={Boolean(getFieldError("sortOrder"))}
            className="px-3 py-2 bg-white/5 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-[#57d9ff]"
          />
          {getFieldError("sortOrder") ? (
            <span className="text-xs text-red-200">{getFieldError("sortOrder")}</span>
          ) : null}
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
              {dictionary.fields.featured}
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
              {dictionary.fields.published}
            </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-end mt-4 px-6 py-2 bg-[#57d9ff] text-[#101841] rounded-full hover:bg-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? dictionary.saving : submitLabel}
        </button>
      </form>
    </dialog>
  );
}

export default PortfolioModal;
