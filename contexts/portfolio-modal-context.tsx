"use client";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { PortfolioItem } from "@prisma/client";

type ModalMode = "create" | "edit";
type FeedbackTone = "success" | "error";
type ModalState = {
  isOpen: boolean;
  mode: ModalMode;
  item: PortfolioItem | null;
};
type AdminFeedback = {
  message: string;
  tone: FeedbackTone;
} | null;
type ModalContextType = {
  modalState: ModalState;
  adminFeedback: AdminFeedback;
  openCreate: () => void;
  openEdit: (item: PortfolioItem) => void;
  closeModal: () => void;
  setAdminFeedback: (feedback: Exclude<AdminFeedback, null>) => void;
  clearAdminFeedback: () => void;
};
const ModalContext = createContext<ModalContextType | null>(null);

export function PortfolioModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
    item: null,
  });
  const [adminFeedback, setAdminFeedbackState] = useState<AdminFeedback>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const clearAdminFeedback = () => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    setAdminFeedbackState(null);
  };

  const setAdminFeedback = (feedback: Exclude<AdminFeedback, null>) => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    setAdminFeedbackState(feedback);
    feedbackTimeoutRef.current = setTimeout(() => {
      setAdminFeedbackState(null);
      feedbackTimeoutRef.current = null;
    }, 4000);
  };

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
      value={{
        modalState,
        adminFeedback,
        openCreate,
        openEdit,
        closeModal,
        setAdminFeedback,
        clearAdminFeedback,
      }}
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
