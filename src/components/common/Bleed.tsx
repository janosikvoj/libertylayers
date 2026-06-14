import { cn } from "@/lib/utils";
import React from "react";
import { PipCorners } from "../brand/Pip";

interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  desktopOnly?: boolean;
  fallbackMessage?: string;
}

const Bleed: React.FC<BleedProps> = ({
  children,
  className,
  desktopOnly = false,
  fallbackMessage = "Please view on a desktop screen to interact with this component.",
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative w-screen max-w-[calc(100vw-var(--nav-width))] left-1/2 -translate-x-1/2 not-prose",
        className,
      )}
      {...props}
    >
      {desktopOnly ? (
        <>
          {/* Hidden on mobile, visible on tablet/desktop */}
          <div className="hidden md:block">{children}</div>

          {/* Visible on mobile, hidden on tablet/desktop */}
          <div className="relative mx-2 md:hidden w-screen p-10 py-12 flex items-center text-sm font-medium justify-center text-center bg-yellow-300">
            <PipCorners />
            {fallbackMessage}
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default Bleed;
