import { Header } from '@/components/navigation/Header';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <div className="fixed inset-0 bg-[url(/noise.png)] mix-blend-multiply pointer-events-none" />
    </>
  );
}
