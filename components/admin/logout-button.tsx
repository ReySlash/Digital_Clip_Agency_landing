"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  const handleClick = () => {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      signOut({ redirect: true, callbackUrl: "/admin/login" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:border-[#57d9ff]/60 hover:bg-[#57d9ff]/10"
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
