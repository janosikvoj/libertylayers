export default async function Page({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const { default: Post } = await import(
    `@/app/(subpages)/articles/[article]/_content/${article}.mdx`
  );

  return <Post />;
}

export function generateStaticParams() {
  return [
    { article: 'negative-rights' },
    { article: 'economic-calculation' },
    { article: 'spontaneous-order' },
  ];
}

export const dynamicParams = false;
