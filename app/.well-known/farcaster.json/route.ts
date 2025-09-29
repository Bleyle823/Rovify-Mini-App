import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getOriginFromRequestOrEnv(request: Request): string {
  const fallbackOrigin = 'https://rovify.vercel.app';
  const envOrigin = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '');
  const candidate = envOrigin || (() => {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  })();

  try {
    const url = new URL(candidate);
    url.protocol = 'https:';
    if (url.hostname === 'localhost' || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(url.hostname) || url.hostname.includes(':')) {
      return fallbackOrigin;
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return fallbackOrigin;
  }
}

function withValidProperties(properties: Record<string, string | string[] | boolean | undefined>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== '';
    })
  );
}

const allowedPrimaryCategories = [
  'games',
  'social',
  'finance',
  'utility',
  'productivity',
  'health-fitness',
  'news-media',
  'music',
  'shopping',
  'education',
  'developer-tools',
  'entertainment',
  'art-creativity'
] as const;
type PrimaryCategory = typeof allowedPrimaryCategories[number];

function sanitizePrimaryCategory(input: string | undefined, fallback: PrimaryCategory): PrimaryCategory {
  if (!input) return fallback;
  const lower = input.toLowerCase() as PrimaryCategory;
  return (allowedPrimaryCategories as readonly string[]).includes(lower) ? (lower as PrimaryCategory) : fallback;
}

function isIpHostname(hostname: string): boolean {
  return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.includes(':');
}

function ensureHttpsUrl(value: string | undefined, origin: string): string | undefined {
  if (!value) return undefined;
  try {
    const absolute = new URL(value, origin);
    absolute.protocol = 'https:';
    if (absolute.hostname === 'localhost' || isIpHostname(absolute.hostname)) return undefined;
    return absolute.toString();
  } catch {
    return undefined;
  }
}

export async function GET(request: Request) {
  const origin = getOriginFromRequestOrEnv(request);

  const tagsFromEnv = (process.env.NEXT_PUBLIC_APP_TAGS || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const requiredChains = (process.env.NEXT_PUBLIC_REQUIRED_CHAINS || '')
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  const homeUrl = ensureHttpsUrl(process.env.NEXT_PUBLIC_HOME_URL, origin) || origin;
  const iconUrl = ensureHttpsUrl(process.env.NEXT_PUBLIC_APP_ICON, origin) || `${origin}/icon.png`;
  const splashImageUrl =
    ensureHttpsUrl(process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE, origin) || `${origin}/splash.png`;
  const webhookUrl = ensureHttpsUrl(process.env.NEXT_PUBLIC_WEBHOOK_URL, origin) || `${origin}/api/webhook`;
  const heroImageUrl = ensureHttpsUrl(process.env.NEXT_PUBLIC_APP_HERO_IMAGE, origin) || `${origin}/hero.png`;
  const ogImageUrl = ensureHttpsUrl(process.env.NEXT_PUBLIC_APP_OG_IMAGE, origin);
  const screenshotUrlsFromEnv = (process.env.NEXT_PUBLIC_APP_SCREENSHOTS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => ensureHttpsUrl(s, origin))
    .filter((s): s is string => Boolean(s));

  const manifest = {
    accountAssociation: {
      header:
        process.env.FARCASTER_HEADER || process.env.FARCASTER_ACCOUNT_ASSOCIATION_HEADER || '',
      payload:
        process.env.FARCASTER_PAYLOAD || process.env.FARCASTER_ACCOUNT_ASSOCIATION_PAYLOAD || '',
      signature:
        process.env.FARCASTER_SIGNATURE || process.env.FARCASTER_ACCOUNT_ASSOCIATION_SIGNATURE || ''
    },
    baseBuilder: {
      allowedAddresses: [
        '0x51FfA4CA0f0dA2c466Ad48763899c87E87260e7e'
      ]
    },
    frame: withValidProperties({
      version: '1',
      name: process.env.NEXT_PUBLIC_APP_NAME || 'Rovify Mini',
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE || 'Rovify on Farcaster and Base',
      description:
        process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
        'Discover events, NFTs, gaming and social features in Rovify Mini.',
      homeUrl,
      iconUrl,
      splashImageUrl,
      splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || '#0f0f0f',
      webhookUrl,
      primaryCategory: sanitizePrimaryCategory(process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY, 'social'),
      tags: tagsFromEnv.length ? tagsFromEnv : ['miniapp', 'farcaster', 'base', 'rovify'],
      heroImageUrl,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE || 'All-in-one social and onchain experiences',
      screenshotUrls: screenshotUrlsFromEnv.length ? screenshotUrlsFromEnv : [`${origin}/screenshot.png`],
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl,
      requiredChains: requiredChains.length ? requiredChains : undefined,
      noindex: (process.env.NEXT_PUBLIC_APP_NOINDEX || 'false') === 'true'
    })
  };

  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600'
    }
  });
}

