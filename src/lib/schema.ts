import { site, isSet } from '@/config/site';

const abs = (path: string) => `${site.url}${path}`;
/** Absolute page URL with trailing slash (matches canonical + sitemap). */
const page = (path: string) => abs(path.endsWith('/') ? path : `${path}/`);

export function organizationSchema() {
  const sameAs = Object.values(site.social).filter(isSet);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: abs('/images/logo.png'),
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    // Email intentionally omitted (spam protection).
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#localbusiness`,
    name: site.name,
    url: `${site.url}/`,
    image: abs('/images/og-default.png'),
    logo: abs('/images/logo.png'),
    parentOrganization: { '@id': `${site.url}/#organization` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.locality,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    areaServed: site.markets,
    ...(isSet(site.phone) ? { telephone: site.phone } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path === '/' ? `${site.url}/` : page(item.path),
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: page(opts.path),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: site.markets,
  };
}

export function courseSchema(opts: {
  name: string;
  description: string;
  path: string;
  free?: boolean;
  mode?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: page(opts.path),
    provider: { '@type': 'Organization', name: site.name, sameAs: `${site.url}/` },
    ...(opts.free ? { isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD', category: 'Free' } } : {}),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: opts.mode ?? 'Online',
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
