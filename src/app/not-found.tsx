import RattleSnake1 from '@/components/illustrations/RattleSnake1';
import { Header } from '@/components/navigation/Header';

export default function NotFoundPage() {
  return (
    <main className="h-screen bg-yellow-300 flex justify-center items-center gap-8">
      <Header />
      <div className="font-semibold text-xl">404</div>
      <RattleSnake1 className="w-xs" />
      <div className="text-lg">Page not found</div>
      <div className="fixed inset-0 bg-[url(/noise.png)] mix-blend-hard-light pointer-events-none" />
    </main>
  );
}
