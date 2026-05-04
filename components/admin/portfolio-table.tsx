"use client";
import { siteData } from "@/lib/site-data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PortfolioItem = (typeof siteData.portfolio.items)[number];

type Props = {
  initialItems: PortfolioItem[];
};

const portfolioHeaders = [
  { key: "title", label: "Title" },
  { key: "platform", label: "Platform" },
  { key: "description", label: "Description" },
  { key: "thumbnailUrl", label: "Thumbnail" },
  { key: "url", label: "URL" },
];

function PortfolioTable({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);

  const handleRemoveItem = (itemId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  };

  return (
    <table className=" min-w-full mt-5 table-auto">
      <thead>
        <tr className="bg-gray-100/10 border-b font-bold">
          {portfolioHeaders.map((header) => (
            <th
              key={header.key}
              className="px-4 py-2 text-left text-sm  text-gray-300"
            >
              {header.label}
            </th>
          ))}
          <th className="px-4 py-2 text-left text-sm  text-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="odd:bg-[#57d9ff]/20 even:bg-[#57d9ff]/30 border-b text-left hover:bg-[#57d9ff]/50 transition-colors duration-150"
          >
            <td className="px-4 py-2 text-sm text-gray-300">{item.title}</td>
            <td className="px-4 py-2 text-sm text-gray-300">{item.platform}</td>
            <td className="px-4 py-2 text-sm text-gray-300">
              {item.description}
            </td>
            <td className="px-4 py-2 text-sm text-gray-300">
              {item.thumbnail}
            </td>
            <td className="px-4 py-2 text-sm text-gray-300">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                {item.href}
              </a>
            </td>
            <td className="text-sm text-gray-300  flex justify-center items-center py-4 px-1 gap-1">
              <Link href="">
                <Image
                  className="w-6 h-auto invert hover:scale-110 transition-transform duration-150"
                  src="/actions/viewIcon.svg"
                  alt=""
                  width={100}
                  height={100}
                />
              </Link>
              <Link href="">
                <Image
                  className="w-6 h-auto invert hover:scale-110 transition-transform duration-150"
                  src="/actions/editIcon.svg"
                  alt=""
                  width={100}
                  height={100}
                />
              </Link>
              <button onClick={() => handleRemoveItem(item.id)}>
                <Image
                  className="w-6 h-auto invert hover:scale-110 transition-transform duration-150"
                  src="/actions/removeIcon.svg"
                  alt=""
                  width={100}
                  height={100}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PortfolioTable;
