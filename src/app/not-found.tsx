import RattleSnake1 from '@/components/illustrations/RattleSnake1';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <main className="h-screen bg-yellow-300 flex justify-center items-center gap-8">
      <div className="font-semibold text-xl">404</div>
      <Image
        className="w-xs"
        src="/rattle-snake_1.png"
        alt="Rattle Snake Illustration"
        priority
        width={367}
        height={506}
      />
      <div className="text-lg">Page not found</div>
      <div className="fixed inset-0 bg-[url(/noise.png)] mix-blend-hard-light pointer-events-none" />
    </main>
  );
}
