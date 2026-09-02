import type { ToolDefinition } from '@/types';
import { getToolDefinition } from '@/registry';

export interface ToolComparison {
  a: string;
  b: string;
  /**
   * Short, factual summary of the difference. Written from existing tool data.
   * Used as the intro sentence on the comparison page.
   */
  summary: string;
  /**
   * Which tool is typically the better fit when the user is trying to save bytes
   * vs. keep a file readable. Derived from tool descriptions, not invented.
   */
  difference: string;
}

/**
 * Curated, genuinely-related comparison pairs drawn from the existing directory.
 * Only pairs within the same category (or clearly comparable purpose) are included.
 * Content is derived from real tool data — nothing is fabricated.
 */
export const comparisons: ToolComparison[] = [
  {
    a: 'json-formatter',
    b: 'json-minifier',
    summary:
      'Both tools work with JSON, but formatters make data readable while minifiers strip whitespace to shrink file size.',
    difference:
      'Use the formatter when you need to read, debug, or edit the structure. Use the minifier when you need the smallest possible payload for storage or transfer.',
  },
  {
    a: 'xml-formatter',
    b: 'xml-minifier',
    summary:
      'XML formatter and minifier serve opposite goals on the same input — readable expansion versus compact size.',
    difference:
      'The formatter indents and separates elements for readability; the minifier removes unnecessary whitespace to reduce payload size.',
  },
  {
    a: 'md5-generator',
    b: 'sha256-generator',
    summary:
      'MD5 and SHA-256 both produce fixed-length hashes, but SHA-256 is cryptographically stronger and collision-resistant.',
    difference:
      'SHA-256 is the safer choice for security-sensitive hashing today. MD5 is fast and still common for legacy checksums but is considered broken for security use.',
  },
  {
    a: 'sha256-generator',
    b: 'sha512-generator',
    summary:
      'SHA-256 and SHA-512 are both SHA-2 family hashes — SHA-512 produces a longer (512-bit) digest than SHA-256.',
    difference:
      'Choose SHA-256 for broad compatibility and smaller digests. Choose SHA-512 when a longer digest or a 64-bit word size matters for your use case.',
  },
  {
    a: 'timestamp-converter',
    b: 'unix-time-converter',
    summary:
      'Both convert between human-readable dates and epoch time — the timestamp converter covers more formats and timezones.',
    difference:
      'The timestamp converter is the more general tool; the Unix time converter is focused specifically on Unix/epoch representations.',
  },
  {
    a: 'json-to-xml',
    b: 'xml-to-json',
    summary:
      'These two converters are the inverse of each other — one goes JSON to XML, the other XML to JSON.',
    difference:
      'Pick the direction that matches your data transformation. Both are useful when moving between APIs or config formats.',
  },
  {
    a: 'postman',
    b: 'curl-generator',
    summary:
      'Postman is a full API platform with a GUI and collections; the curl generator produces quick curl commands for testing endpoints.',
    difference:
      'Use Postman for structured, collaborative API development and testing. Use the curl generator for a fast, scriptable command you can drop into a terminal.',
  },
  {
    a: 'jwt-decoder',
    b: 'jwt-inspector',
    summary:
      'Both decode JWT tokens and show their header, payload, and claims — this is a near-duplicate pair.',
    difference:
      'Both let you inspect a token&apos;s claims locally. Open the one you landed on; they solve the same problem.',
  },
  {
    a: 'base64-encoder-decoder',
    b: 'base32-converter',
    summary:
      'Base64 and Base32 are both binary-to-text encodings — Base64 is denser, Base32 is case-insensitive and more human-readable.',
    difference:
      'Base64 is the common default for data and JWT payloads. Base32 is useful where case-insensitivity matters (e.g. keys you might type or read aloud).',
  },
  {
    a: 'url-encoder-decoder',
    b: 'url-parser',
    summary:
      'The URL encoder encodes and decodes special characters, while the URL parser breaks a URL into its components.',
    difference:
      'Encode when building or reading query strings. Parse when you need to understand the parts of a URL — protocol, host, path, query, and fragment.',
  },
  {
    a: 'color-converter',
    b: 'color-palette-generator',
    summary:
      'The color converter translates between color models (HEX, RGB, HSL), while the palette generator creates harmonious color sets.',
    difference:
      'Convert a single color when you need it in another format. Generate a palette when you need a coordinated set of colors for a design.',
  },
  {
    a: 'regex-tester',
    b: 'regex-generator',
    summary:
      'The regex tester validates and debugs patterns against sample text, while the regex generator builds common patterns for you.',
    difference:
      'Use the tester to check and refine a pattern you already have. Use the generator to start from a common building block.',
  },
  {
    a: 'csv-viewer',
    b: 'csv-formatter',
    summary:
      'The CSV viewer renders tabular data for inspection, while the CSV formatter normalizes delimiters and layout.',
    difference:
      'View a file to understand its contents. Format it to fix inconsistent delimiters or whitespace.',
  },
  {
    a: 'image-compressor',
    b: 'image-resizer',
    summary:
      'The compressor reduces file size, while the resizer changes pixel dimensions. Often used together.',
    difference:
      'Compress to shrink byte size for faster loading. Resize to change the displayed dimensions or aspect ratio. For the smallest images, do both.',
  },
  {
    a: 'sql-formatter',
    b: 'sql-minifier',
    summary:
      'The SQL formatter makes queries readable; the SQL minifier compresses them by removing whitespace and comments.',
    difference:
      'Format for readability, debugging, and reviews. Minify to reduce payload size or obfuscate.',
  },
  {
    a: 'case-converter',
    b: 'text-sorter',
    summary:
      'The case converter changes text between casing styles, while the text sorter reorders lines.',
    difference:
      'Change casing when normalizing identifiers or headings. Sort when you need lines in a specific order.',
  },
];

export interface ComparisonPair {
  pair: ToolComparison;
  toolA: ToolDefinition;
  toolB: ToolDefinition;
}

export function getComparisons(): ComparisonPair[] {
  const result: ComparisonPair[] = [];
  for (const pair of comparisons) {
    const toolA = getToolDefinition(pair.a);
    const toolB = getToolDefinition(pair.b);
    if (toolA && toolB) {
      result.push({ pair, toolA, toolB });
    }
  }
  return result;
}

export function getComparisonBySlug(a: string, b: string): ComparisonPair | undefined {
  const found = comparisons.find(
    (pair) => (pair.a === a && pair.b === b) || (pair.a === b && pair.b === a)
  );
  if (!found) return undefined;
  const toolA = getToolDefinition(found.a);
  const toolB = getToolDefinition(found.b);
  if (!toolA || !toolB) return undefined;
  return { pair: found, toolA, toolB };
}

export function getComparisonSlug(pair: ToolComparison): string {
  return `${pair.a}-vs-${pair.b}`;
}

export function slugToComparison(slug: string): { a: string; b: string } | undefined {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return undefined;
  return { a: match[1], b: match[2] };
}

export function getRelatedComparisons(pair: ComparisonPair, count = 2): ComparisonPair[] {
  const sharedSlugs = new Set([pair.pair.a, pair.pair.b]);
  return getComparisons()
    .filter((candidate) => {
      if (candidate.pair.a === pair.pair.a && candidate.pair.b === pair.pair.b) return false;
      return (
        sharedSlugs.has(candidate.pair.a) ||
        sharedSlugs.has(candidate.pair.b) ||
        candidate.toolA.category === pair.toolA.category ||
        candidate.toolB.category === pair.toolB.category
      );
    })
    .slice(0, count);
}

export function getComparisonsForTool(slug: string, count = 3): ComparisonPair[] {
  return getComparisons()
    .filter((entry) => entry.pair.a === slug || entry.pair.b === slug)
    .slice(0, count);
}
