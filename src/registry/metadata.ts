import type { Metadata } from 'next';
import type { BreadcrumbItem, ToolDefinition } from '@/types';
import { createToolMetadata, createToolPageStructuredData } from '@/seo';
import { getCategoryBySlug } from '@/registry/category-registry';

export function getToolBreadcrumbItems(definition: ToolDefinition): BreadcrumbItem[] {
  const category = getCategoryBySlug(definition.category);
  const items: BreadcrumbItem[] = [];
  if (category) {
    items.push({ label: category.name, href: `/categories/${category.slug}` });
  }
  items.push({ label: definition.title, current: true });
  return items;
}

export function generateToolMetadata(definition: ToolDefinition): Metadata {
  return createToolMetadata(definition);
}

export function generateToolStructuredData(definition: ToolDefinition): Record<string, unknown>[] {
  return createToolPageStructuredData(definition);
}
