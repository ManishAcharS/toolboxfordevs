import { NextRequest, NextResponse } from 'next/server';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)([/?#].*)?$/i;

export const runtime = 'nodejs';

interface SubmitToolPayload {
  toolName?: unknown;
  websiteUrl?: unknown;
  description?: unknown;
  category?: unknown;
  submitterEmail?: unknown;
  plan?: unknown;
}

function cleanId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export async function POST(request: NextRequest) {
  let payload: SubmitToolPayload;
  try {
    payload = (await request.json()) as SubmitToolPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const toolName = typeof payload.toolName === 'string' ? payload.toolName.trim() : '';
  const websiteUrl = typeof payload.websiteUrl === 'string' ? payload.websiteUrl.trim() : '';
  const description = typeof payload.description === 'string' ? payload.description.trim() : '';
  const category = typeof payload.category === 'string' ? payload.category.trim() : '';
  const submitterEmail =
    typeof payload.submitterEmail === 'string' ? payload.submitterEmail.trim() : '';
  const plan = payload.plan === 'featured' ? 'featured' : 'free';

  const errors: Record<string, string> = {};
  if (!toolName) errors.toolName = 'Please enter the tool name.';
  else if (toolName.length > 120) errors.toolName = 'Tool name should be 120 characters or fewer.';
  if (!websiteUrl) errors.websiteUrl = 'Please enter the website URL.';
  else if (!URL_PATTERN.test(websiteUrl))
    errors.websiteUrl = 'Please enter a valid website URL (e.g. https://example.com).';
  if (!description) errors.description = 'Please describe your tool.';
  else if (description.length < 20)
    errors.description = 'Please provide at least 20 characters of description.';
  else if (description.length > 2000)
    errors.description = 'Description should be 2000 characters or fewer.';
  if (!category) errors.category = 'Please choose a category.';
  if (!submitterEmail) errors.submitterEmail = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(submitterEmail))
    errors.submitterEmail = 'Please enter a valid email address.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const record = {
    id: cleanId(),
    toolName,
    websiteUrl,
    description,
    category,
    submitterEmail,
    plan,
    submittedAt: new Date().toISOString(),
  };

  try {
    const dir = path.join(process.cwd(), 'data', 'submissions');
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, 'submissions.jsonl'), `${JSON.stringify(record)}\n`, 'utf8');
  } catch {
    return NextResponse.json(
      { error: 'We could not save your submission. Please try again in a moment.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message:
        plan === 'featured'
          ? 'Featured listing selected. We’ll contact you with payment instructions.'
          : 'Your tool has been submitted for review. We’ll get back to you soon.',
    },
    { status: 201 }
  );
}
