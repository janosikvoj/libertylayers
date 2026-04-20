import Image from 'next/image';
import Link from 'next/link';

export default function ArticlesPage() {
  return (
    <div className="px-12 pt-24 flex gap-6 bg-stone-800 min-h-screen">
      <Image
        className="absolute"
        src="/rattle-snake_2.png"
        alt="Rattle Snake Illustration"
        priority
        width={809}
        height={1091}
      />
      <Link href="/articles/negative-rights">Negative Rights</Link>
      <Link href="/articles/economic-calculation">Economic Calculation</Link>
      <Link href="/articles/spontaneous-order">Spontaneous Order</Link>
    </div>
  );
}
