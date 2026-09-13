import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getToolEntry,
  getAllToolDefinitions,
  getRelatedToolsFor,
  generateToolMetadata,
  generateToolStructuredData,
} from '@/registry';
import { getToolGuide } from '@/data/tool-guides';
import { StructuredData } from '@/lib/seo';
import { ToolLayout } from '@/components/tools/tool-layout';
import { ToolContent } from '@/components/tools/tool-content';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllToolDefinitions().map((definition) => ({ slug: definition.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getToolEntry(slug);
  if (!entry) {
    return {};
  }
  return generateToolMetadata(entry.definition);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const entry = getToolEntry(slug);

  if (!entry) {
    notFound();
  }

  const { definition } = entry;
  const relatedTools = getRelatedToolsFor(definition, 3);
  const guide = getToolGuide(definition.slug);

  return (
    <>
      <StructuredData data={generateToolStructuredData(definition)} />
      <ToolLayout
        definition={definition}
        relatedTools={relatedTools}
        guide={guide}
        content={<ToolContent definition={definition} component={entry.component} />}
      />
    </>
  );
}
