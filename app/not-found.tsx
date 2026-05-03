import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center text-center items-center min-h-screen bg-[#101841] text-white gap-8">
      <h1 className="text-5xl">404 - Not Found</h1>
      <p className="text-3xl">La página que estás buscando no existe.</p>
      <Link
        className=" inline-flex min-h-12 w-auto items-center justify-center rounded-full bg-[#57d9ff] px-6 text-sm font-semibold text-[#101841] transition hover:bg-white"
        href="/"
      >
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFound;
