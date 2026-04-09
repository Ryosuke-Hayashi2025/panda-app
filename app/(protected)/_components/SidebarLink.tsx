import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export const SidebarLink: React.FC<Props> = ({ label, href }) => {
  const pathname = usePathname();
  const isSelected = (href: string) => pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`p-4 block hover:bg-blue-100 ${
        isSelected(href) && "bg-blue-100"
      }`}
    >
      {label}
    </Link>
  );
};
