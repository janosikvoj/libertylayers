import Link from 'next/link';

export default function ArticlesPage() {
  return (
    <div className="px-12 pt-24 flex gap-6">
      <Link href="/articles/negative-rights">Negative Rights</Link>
      <Link href="/articles/economic-calculation">Economic Calculation</Link>
      <Link href="/articles/spontaneous-order">Spontaneous Order</Link>
    </div>
  );
}
