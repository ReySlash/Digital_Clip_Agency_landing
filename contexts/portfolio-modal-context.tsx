"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { PortfolioItem } from "@prisma/client";

type ModalMode = "create" | "edit";
type ModalState = {
  isOpen: boolean;
  mode: ModalMode;
  item: PortfolioItem | null;
};
type ModalContextType = {
  modalState: ModalState;
  openCreate: () => void;
  openEdit: (item: PortfolioItem) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | null>(null);

export function PortfolioModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
    item: null,
  });
  const openCreate = () => {
    setModalState({ isOpen: true, mode: "create", item: null });
  };
  const openEdit = (item: PortfolioItem) => {
    setModalState({ isOpen: true, mode: "edit", item });
  };
  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <ModalContext.Provider
      value={{ modalState, openCreate, openEdit, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
export function usePortfolioModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "usePortfolioModal must be used within PortfolioModalProvider",
    );
  }
  return context;
}
