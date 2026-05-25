"use client";

import { useDossier } from "@/context/DossierContext";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    title: "¤ Liberty Layers",
    href: "/",
  },
  {
    title: "Articles",
    href: "/articles",
  },
  {
    title: "Glossary",
    href: "/glossary",
  },
  {
    title: "Archive",
    href: "/archive",
  },
];

const MotionLink = motion.create(Link);

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { stage } = useDossier();
  const isOpen = stage === "open";

  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (!isOpen) return;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50",
        "transition-colors duration-500",
        "text-stone-800",
        className,
      )}
    >
      <NavigationMenu.Root className="mx-12 my-4">
        <NavigationMenu.List className="flex gap-6">
          {LINKS.map((item, i) => {
            const active = isActive(item.href);
            const landingPageLinkAnimated = item.href === "/" && isLandingPage;
            return (
              <NavigationMenu.Item key={item.title + i}>
                <MotionLink
                  variants={{
                    initial: landingPageLinkAnimated
                      ? { y: 0, opacity: 1 }
                      : { y: 16, opacity: 0 },
                    idle: { y: 0, opacity: 1 },
                    active: { y: 0, opacity: 1 },
                    hover: { y: 0, opacity: 1 },
                  }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  initial={"initial"}
                  animate={active ? "active" : "idle"}
                  whileHover={!active ? "hover" : active ? "active" : "idle"}
                  href={item.href}
                  className={cn(
                    "group relative inline-block",
                    i === 0 && "font-semibold",
                  )}
                >
                  <span className="relative z-10 block">{item.title}</span>
                  <motion.span
                    variants={{
                      initial: { clipPath: "inset(0 100% 0 0)" },
                      idle: { clipPath: "inset(0 100% 0 0)" },
                      hover: {
                        clipPath: !active
                          ? "inset(0 85% 0 0)"
                          : "inset(0 100% 0 0)",
                      },
                      active: { clipPath: "inset(0 0% 0 0)" },
                    }}
                    transition={
                      active
                        ? { duration: 0.5, ease: [0.2, 0, 0, 1] }
                        : { duration: 0.15, ease: "easeOut" }
                    }
                    style={{ width: "calc(100% + 1rem)" }}
                    className={cn(
                      "block absolute bottom-0 h-full -mx-2 bg-checker",
                      isLandingPage ? "text-yellow-500" : "text-yellow-400",
                    )}
                  />
                </MotionLink>
              </NavigationMenu.Item>
            );
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};
