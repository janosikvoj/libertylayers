import { Header } from "@/components/navigation/Header";
import { ViewTransition } from "react";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="fixed inset-0 bg-[url(/noise.png)] mix-blend-hard-light pointer-events-none" />
    </>
  );
}
