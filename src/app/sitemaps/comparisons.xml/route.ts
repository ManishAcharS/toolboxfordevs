import { buildSitemapXml, sitemapXmlResponse, getComparisonSitemapEntries } from '@/seo';

export const dynamic = 'force-static';

export function GET(): Response {
  return sitemapXmlResponse(buildSitemapXml(getComparisonSitemapEntries()));
}
