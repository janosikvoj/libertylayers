import TableOfContents from "@/components/navigation/TableOfContents";
import { cn } from "@/lib/utils";

export default async function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid lg:grid-cols-[var(--nav-width)_1fr] [--nav-width:0rem] lg:[--nav-width:20rem]">
      <div className="hidden lg:block bg-linear-90 from-stone-300 min-h-screen">
        <TableOfContents />
      </div>
      <main className="overflow-x-hidden flex flex-col items-center">
        <article
          className={cn(
            "px-12 max-w-[calc(100vw-var(--nav-width))] w-[65ch]",
            "prose prose-stone prose-lg",
            "prose-headings:tracking-tight prose-h2:font-semibold",
          )}
        >
          {children}
        </article>
      </main>
    </div>
  );
}
