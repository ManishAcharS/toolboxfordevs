import { notFound } from 'next/navigation';

interface CatchAllPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  await params;
  notFound();
}
