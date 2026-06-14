"use client";

import { ReactNode } from "react";

export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isExhibitionMode = process.env.NEXT_PUBLIC_EXHIBITION_MODE === "true";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExhibitionMode) {
      e.preventDefault();
      // TODO: Show a custom toast notification
      alert(
        "CLASSIFIED: External network access is restricted in this environment. (No internet)",
      );
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
