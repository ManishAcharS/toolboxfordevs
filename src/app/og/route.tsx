import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #0ea5e9 160%)',
        padding: 72,
        boxSizing: 'border-box',
        fontFamily: 'Geist Sans, system-ui, sans-serif',
        color: 'white',
        fontSize: 40,
        fontWeight: 700,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #0ea5e9, #d946ef)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 38,
          }}
        >
          🧰
        </div>
        <span>{siteConfig.name}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Find the right developer tool faster
        </div>
        <div style={{ fontSize: 30, color: '#9ca3af', maxWidth: 800, fontWeight: 400 }}>
          150+ free developer tools — generators, converters, formatters, and testers.
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
