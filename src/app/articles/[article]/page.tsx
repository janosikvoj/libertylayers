export default async function Page({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const { default: Post } = await import(
    `@/app/articles/[article]/_content/${article}.mdx`
  );

  return <Post />;
}

export function generateStaticParams() {
  return [
    { article: "negative-rights" },
    { article: "economic-calculation" },
    { article: "spontaneous-order" },
  ];
}

export const dynamicParams = false;
